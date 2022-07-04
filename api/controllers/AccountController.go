package controllers

import (
	"Better-Bank-Account/api/models"
	"errors"
	"fmt"
	"math"
	"net/http"
	"strings"
	"time"

	"github.com/go-chi/chi"
	"github.com/go-chi/render"
	"github.com/google/uuid"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
)

const (
	deposit                 string = "deposit"
	withdraw                string = "withdraw"
	usernameURLParam        string = "username"
	accountidURLParam       string = "accountid"
	invalidTypeError        string = "errInvalidtype"
	userNotFoundError       string = "errUserNotFound"
	invalidAccountIdError   string = "errInvalidAccountId"
	duplicateAccountError   string = "errDuplicateAccountName"
	invalidTransactionError string = "errInvalidAmount"
) 

func GetAccountsByUsername(res http.ResponseWriter, req *http.Request){
	user := req.Context().Value("user").(models.User)//Retrieve the user pass through the second middleware.

	r.JSON(res, http.StatusOK, user.BankAccounts)
}

func GetAccountByUsername(res http.ResponseWriter, req *http.Request){
	user := req.Context().Value("user").(models.User)
	accountID := chi.URLParam(req, accountidURLParam)
	account, _, err := validateAccountId(accountID, user)

	if err != nil{
		r.JSON(res, http.StatusNotFound, jsonBody{invalidAccountIdError: err.Error()})
		return
	}

	r.JSON(res, http.StatusOK, account)
}

func AddAccount(res http.ResponseWriter, req *http.Request){
	account := models.Account{}

	if err := render.DecodeJSON(req.Body, &account); err != nil{
		r.JSON(res, http.StatusBadRequest, err)
		return
	}

	if err := account.Validate(); err != nil{
		r.JSON(res, http.StatusBadRequest, err)
		return
	}

	user := req.Context().Value("user").(models.User)

	//After ensuring the user exists, prevent them from having duplicate bank account names.
	if err := validateAccountName(account.AccountName, user.BankAccounts); err != nil{
		r.JSON(res, http.StatusBadRequest, jsonBody{duplicateAccountError: err.Error()})
		return
	}

	//After adding the id to the new account, append the account to the users list of bank accounts.
	account.ID        = strings.Replace(uuid.NewString(), "-", "", -1)
	account.CreatedAt = time.Now()
	account.UpdatedAt = time.Now()

	fmt.Println("account:", account)

	_, err := mgm.Coll(&models.User{}).UpdateOne(
		mgm.Ctx(), 
		bson.M{"username": user.Username}, 
		bson.M{"$push": bson.M{"accounts": account}},
	)

	fmt.Println("err:", err)

	r.JSON(res, http.StatusOK, account.ID)
}

func DeleteAccount(res http.ResponseWriter, req *http.Request){
	accountID := chi.URLParam(req, accountidURLParam)
	user := req.Context().Value("user").(models.User)

	_, _, err := validateAccountId(accountID, user)
	if err != nil{
		r.JSON(res, http.StatusNotFound, jsonBody{invalidAccountIdError: err.Error()})
		return
	}

	result, _ := mgm.Coll(&models.User{}).UpdateOne(mgm.Ctx(), bson.M{"username": user.Username}, 
		bson.M{
			"$pull": bson.M{ "accounts": bson.M{"id": accountID}},
		},
	)

	r.JSON(res, http.StatusOK, result)
}

func Transfer(res http.ResponseWriter, req *http.Request){
	var transactionAmount float64

	if err := render.DecodeJSON(req.Body, &transactionAmount); err != nil{
		r.JSON(res, http.StatusBadRequest, jsonBody{invalidTypeError: err.Error()})
		return
	}

	if transactionAmount < 0 {
		r.JSON(res, http.StatusBadRequest, jsonBody{invalidTransactionError: "Transaction amount cannot be negative."})
		return
	}

	user := req.Context().Value("user").(models.User)
	accountFromId := chi.URLParam(req, "accountFromId")
	accountToId   := chi.URLParam(req, "accountToId")
	accountFrom, indexFrom, errAccountFrom := validateAccountId(accountFromId, user)
	accountTo,   indexTo,   errAccountTo   := validateAccountId(accountToId, user)

	if errAccountFrom != nil{
		r.JSON(res, http.StatusNotFound, jsonBody{invalidAccountIdError: errAccountFrom.Error()})
		return
	}

	if errAccountTo != nil{
		r.JSON(res, http.StatusNotFound, jsonBody{invalidAccountIdError: errAccountTo.Error()})
		return
	}

	if accountFromId == accountToId{
		r.JSON(res, http.StatusBadRequest, jsonBody{"errSameAccount": "Accounts cannot be the same for transfer."})
		return
	}

	// If the transaction amount is greater than the account that is being transferred from, complain.
	if transactionAmount > user.BankAccounts[indexFrom].AvailableBalance{
		user.Transfers = append(user.Transfers, createTransfer(
			false, 
			accountFrom.AccountName,
			accountTo.AccountName,
			transactionAmount,
		))
		
		mgm.Coll(&models.User{}).UpdateOne(mgm.Ctx(), bson.M{"username": user.Username}, bson.M{"$set": user})
		r.JSON(res, http.StatusBadRequest, jsonBody{invalidTransactionError: "Insufficient funds. Cannot perform transfer."})
		return
	}

	//After performing the transfer, floor the results to keep it to two decimals.
	user.BankAccounts[indexFrom].AvailableBalance = math.Floor((user.BankAccounts[indexFrom].AvailableBalance - transactionAmount) * 100) / 100
	user.BankAccounts[indexFrom].OnDepositBalance = user.BankAccounts[indexFrom].AvailableBalance
	user.BankAccounts[indexTo].AvailableBalance = math.Floor((user.BankAccounts[indexTo].AvailableBalance + transactionAmount) * 100) / 100
	user.BankAccounts[indexTo].OnDepositBalance = user.BankAccounts[indexTo].AvailableBalance

	//Append a transfer transaction to the users transfer array to keep track of every transfer made.
	user.Transfers = append(user.Transfers, createTransfer(
		true, 
		user.BankAccounts[indexFrom].AccountName,
		user.BankAccounts[indexTo].AccountName,
		transactionAmount,
	))

	mgm.Coll(&models.User{}).UpdateOne(mgm.Ctx(), bson.M{"username": user.Username}, bson.M{"$set": user})
	
	r.JSON(res, http.StatusOK, jsonBody{
		"Account From": user.BankAccounts[indexFrom], 
		"Account To"  : user.BankAccounts[indexTo],
	})
}

func DepositIntoBankAccount(res http.ResponseWriter, req *http.Request){
	handleAccountTransactions(deposit, res, req)
}

func WithdrawFromBankAccount(res http.ResponseWriter, req *http.Request){
	handleAccountTransactions(withdraw, res, req)
}

func handleAccountTransactions(transactionType string, res http.ResponseWriter, req *http.Request){
	var transactionAmount float64

	if err := render.DecodeJSON(req.Body, &transactionAmount); err != nil{
		r.JSON(res, http.StatusBadRequest, jsonBody{invalidTypeError: err.Error()})
		return
	}

	if transactionAmount < 0 {
		r.JSON(res, http.StatusBadRequest, jsonBody{invalidTransactionError: "Transaction amount cannot be negative."})
		return
	}

	user := req.Context().Value("user").(models.User)
	accountID := chi.URLParam(req, accountidURLParam)
	account, accountindex, err := validateAccountId(accountID, user)

	if err != nil{
		r.JSON(res, http.StatusOK, jsonBody{invalidAccountIdError: err.Error()})
		return
	}

	if transactionType == deposit{
		account.AvailableBalance += transactionAmount
		account.OnDepositBalance += transactionAmount
	}else if transactionType == withdraw && account.AvailableBalance >= transactionAmount{
		account.AvailableBalance -= transactionAmount
		account.OnDepositBalance -= transactionAmount
	}else{
		r.JSON(res, http.StatusBadRequest, jsonBody{invalidTransactionError: "Insufficient funds. Please enter a different amount."})
		return
	}
	
	account.AvailableBalance = math.Floor(account.AvailableBalance * 100) / 100
	account.OnDepositBalance = math.Floor(account.AvailableBalance * 100) / 100
	account.UpdatedAt = time.Now()
	user.BankAccounts[accountindex] = account

	mgm.Coll(&models.User{}).UpdateOne(mgm.Ctx(), bson.M{"username": user.Username}, bson.M{"$set": user})

	r.JSON(res, http.StatusOK, account)
}

func validateAccountName(accountName string, accounts []models.Account) error {
	for _, account := range accounts{
		if accountName == account.AccountName{
			return errors.New(fmt.Sprintf("Account name \"%s\" already in use. Please select another one.", accountName))
		} 
	}

	return nil
}

func validateAccountId(accountID string, user models.User) (models.Account, int, error){
	for i, account := range user.BankAccounts{
		if accountID == account.ID{
			return account, i, nil
		}
	}

	return models.Account{}, -1, errors.New(fmt.Sprintf("Account with id: %s not found.", accountID))
}

func createTransfer(isTransferSuccessful bool, accountFrom string, accountTo string, transactionAmount float64) models.Transfer{
	status := ""

	if isTransferSuccessful{
		status = "completed"
	}else{
		status = "failed"
	}

	return models.Transfer{
		ID: strings.Replace(uuid.NewString(), "-", "", -1),
		TransferDate: time.Now(),
		AccountFromName: accountFrom,
		AccountToName: accountTo,
		TransferAmount: transactionAmount,
		Status: status,
	}
}