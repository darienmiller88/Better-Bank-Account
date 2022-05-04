package models

import (
	"errors"
	"fmt"
	"time"

	// "github.com/kamva/mgm/v3"
	"github.com/nerock/ozzo-validation"
	// "github.com/nerock/ozzo-validation/is"
)

type Account struct{
	// mgm.DefaultModel         `bson:",inline"`
	ID               string
	CreatedAt        time.Time `json:"created_at"        bson:"created_at"`
	UpdatedAt        time.Time `json:"updated_at"        bson:"updated_at"`
	AvailableBalance float64   `json:"available_balance" bson:"available_balance"`
	OnDepositBalance float64   `json:"ondeposit_balance" bson:"ondeposit_balance"`
	AccountType      string    `json:"account_type"      bson:"account_type"`
	AccountName      string    `json:"account_name"      bson:"account_name"`
}

var accountTypes []string = []string{"Checkings", "Savings"}

func (a Account) Validate() error{
	return validation.ValidateStruct(
		&a,
		validation.Field(&a.AccountName, validation.Required, validation.Length(4, 20)),
		validation.Field(&a.AccountType, validation.Required, validation.By(checkAccountTypes)),
	)
}
 

func checkAccountTypes(accountToValidate interface{}) error{
	accountType, _ := accountToValidate.(string)

	for _, a := range accountTypes{
		if accountType == a{
			return nil
		}
	}

	return errors.New(fmt.Sprintf("Account type must be one of the following: %v", accountTypes))
}