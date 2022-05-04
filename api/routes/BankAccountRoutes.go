package routes

import (
	"Better-Bank-Account/api/controllers"
	// "Better-Bank-Account/api/auth"

	"github.com/go-chi/chi"
)

type BankAccountRoutes struct{
	Router *chi.Mux
}

// const(
// 	usernameURLParam  string = "username"
// 	accountIdURLParam string = "accountid"
// )

func (b *BankAccountRoutes) Init(){
	b.Router = chi.NewRouter()

	b.Router.Get("/{username}", controllers.GetAccountsByUsername)
	b.Router.Post("/{username}", controllers.AddAccount)
	b.Router.Get("/{username}/{accountid}", controllers.GetAccountByUsername)
	b.Router.Delete("/{username}/{accountid}", controllers.DeleteAccount)
	b.Router.Put("/deposit/{username}/{accountid}", controllers.DepositIntoBankAccount)
	b.Router.Put("/withdraw/{username}/{accountid}", controllers.WithdrawFromBankAccount)
}