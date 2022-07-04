package models

import (
	"errors"
	"fmt"
	"strings"
	"time"
	"unicode"

	"github.com/kamva/mgm/v3"
	"github.com/nerock/ozzo-validation"
	"github.com/nerock/ozzo-validation/is"
)

type User struct{
	mgm.DefaultModel          `bson:",inline"`
	Username       string     `json:"username"        bson:"username"`//Username for standard sign up.
	GoogleUsername string     `json:"google_username" bson:"google_username"` //Username for google signin.
	Password       string     `json:"password"        bson:"password"`
	RememberMe     bool       `json:"remember_me"     bson:"remember_me"`
	LastSignin     time.Time  `json:"last_signin"     bson:"last_signin"`
	BankAccounts   []Account  `json:"accounts"        bson:"accounts"`
	Transfers      []Transfer `json:"transfers"       bson:"transfers"`
	TestArr        []int      `json:"test_arr"        bson:"test_arr"`
}

const passwordMin int = 6
const passwordMax int = 50

func (u User) Validate() error {
	return validation.ValidateStruct(&u,
		validation.Field(&u.Username, validation.Required, validation.Length(5, 20), is.Alphanumeric),
		validation.Field(&u.Password, validation.Required, validation.By(trimPasswordCheck), validation.By(validatePassword)),
		validation.Field(&u.BankAccounts, validation.By(validateAccounts)),
	)
}

func validatePassword(password interface{}) error{
	pass, _ := password.(string)

	for _, c := range pass{
		if unicode.IsDigit(c){
			return nil
		}
	}

	return errors.New("Password must contain at least one number.")
}

func trimPasswordCheck(password interface{}) error{
	pass, _ := password.(string)

	if trimmedPassword := strings.Trim(pass, " "); len(trimmedPassword) < passwordMin || len(trimmedPassword) > passwordMax{
		return errors.New(fmt.Sprintf("Password must be between %d and %d characters.", passwordMin, passwordMax))
	}

	return nil
}

func validateAccounts(accountsToValidate interface{}) error{
	accounts, _ := accountsToValidate.([]Account)

	for _, account := range accounts{
		if err := account.Validate(); err != nil{
			return err
		}
	}

	return nil
}