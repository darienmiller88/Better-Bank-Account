package models

import (
	"errors"
	"fmt"
	"strings"
	"unicode"

	"github.com/kamva/mgm/v3"
	"github.com/nerock/ozzo-validation"
	"github.com/nerock/ozzo-validation/is"
)

type User struct{
	mgm.DefaultModel  `bson:",inline"`
	Username   string `json:"username"    bson:"username"`
	Password   string `json:"password"    bson:"password"`
	RememberMe bool   `json:"remember_me" bson:"remember_me"`
}

const passwordMin int = 6
const passwordMax int = 50

func (u User) Validate() error {
	return validation.ValidateStruct(&u,
		validation.Field(&u.Username, validation.Required, validation.Length(5, 20), is.Alphanumeric),
		validation.Field(&u.Password, validation.Required, validation.By(trimPasswordCheck), validation.By(validatePassword)),
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