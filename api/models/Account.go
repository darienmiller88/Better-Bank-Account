package models

import(
	"github.com/kamva/mgm/v3"
)

type Account struct{
	mgm.DefaultModel         `bson:",inline"`
	AvailableBalance float64 `json:"available_balance" bson:"available_balance"`
	OnDepositBalance float64 `json:"ondeposit_balance" bson:"ondeposit_balance"`
	AccountType      string  `json:"account_type"      bson:"account_type"`
	AccountName      string  `json:"account_name"      bson:"account_name"`
}