package models

import(
	"github.com/kamva/mgm/v3"
)

type User struct{
	mgm.DefaultModel `bson:",inline"`
	Name     string  `json:"name"     bson:"name"`
	Password string  `json:"password" bson:"password"`
}