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
	result, _        := mgm.Coll(&models.User{}).UpdateOne(
		mgm.Ctx(), 
		bson.M{"username": user.Username}, 
		bson.M{"$push": bson.M{"accounts": account}},
	)

	r.JSON(res, http.StatusOK, result)
}


func DeleteAccount(res http.ResponseWriter, req *http.Request){
	accountID := chi.URLParam(req, accountidURLParam)
	user := req.Context().Value("user").(models.User)

	_, _, err := validateAccountId(accountID, user)
	if err != nil{
		r.JSON(res, http.StatusNotFound, jsonBody{invalidAccountIdError: err.Error()})
		return
	}

	result, _ := mgm.Coll(&models.User{}).UpdateOne(mgm.Ctx(), 
		bson.M{"username": user.Username}, 
		bson.M{
			"$pull": bson.M{ "accounts": bson.M{"id": accountID}},
		},
	)

	r.JSON(res, http.StatusOK, result)
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

	mgm.Coll(&models.User{}).UpdateOne(mgm.Ctx(), 
		bson.M{"username": user.Username}, 
		bson.M{"$set": user},
	)

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