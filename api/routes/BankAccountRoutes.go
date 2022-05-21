package routes

import (
	"Better-Bank-Account/api/controllers"
	"Better-Bank-Account/api/middlewares"

	"github.com/go-chi/chi"
)

type BankAccountRoutes struct{
	Router *chi.Mux
}

func (b *BankAccountRoutes) Init(){
	b.Router = chi.NewRouter()

	//For some reason, using this line doesn't register the url param name. Who knows?
	//b.Router.Use(middlewares.Authenticate)
	b.Router.With(middlewares.Authenticate, middlewares.AuthUser).Get("/{username}", controllers.GetAccountsByUsername)
	b.Router.With(middlewares.Authenticate, middlewares.AuthUser).Post("/{username}", controllers.AddAccount)
	b.Router.With(middlewares.Authenticate, middlewares.AuthUser).Get("/{username}/{accountid}", controllers.GetAccountByUsername)
	b.Router.With(middlewares.Authenticate, middlewares.AuthUser).Delete("/{username}/{accountid}", controllers.DeleteAccount)
	b.Router.With(middlewares.Authenticate, middlewares.AuthUser).Put("/deposit/{username}/{accountid}", controllers.DepositIntoBankAccount)
	b.Router.With(middlewares.Authenticate, middlewares.AuthUser).Put("/withdraw/{username}/{accountid}", controllers.WithdrawFromBankAccount)
	b.Router.With(middlewares.Authenticate, middlewares.AuthUser).Put("/transfer/{username}/{accountFromId}/{accountToId}", controllers.Transfer)
}