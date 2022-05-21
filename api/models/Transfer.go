package models

import (
	"time"
)

type Transfer struct {
	ID              string	  `json:"id"                bson:"id"`
	TransferDate    time.Time `json:"transfer_date"     bson:"transfer_date"`
	AccountFromName string    `json:"account_from_name" bson:"account_from_name"`
	AccountToName   string    `json:"account_to_name"   bson:"account_to_name"`
	Status          string    `json:"status"            bson:"status"`
	TransferAmount  float64   `json:"transfer_amount"   bson:"transfer_amount"`
}