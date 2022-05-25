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

	b.Router.With(middlewares.Authenticate, middlewares.AuthUser).Route("/{username}", func(r chi.Router) {
		r.Get("/", controllers.GetAccountsByUsername)
		r.Post("/", controllers.AddAccount)
		r.Get("/{accountid}", controllers.GetAccountByUsername)
		r.Delete("/{accountid}", controllers.DeleteAccount)
	})
	b.Router.With(middlewares.Authenticate, middlewares.AuthUser).Put("/deposit/{username}/{accountid}", controllers.DepositIntoBankAccount)
	b.Router.With(middlewares.Authenticate, middlewares.AuthUser).Put("/withdraw/{username}/{accountid}", controllers.WithdrawFromBankAccount)
	b.Router.With(middlewares.Authenticate, middlewares.AuthUser).Put("/transfer/{username}/{accountFromId}/{accountToId}", controllers.Transfer)
}

