package routes

import(
	"github.com/go-chi/chi"

)

type Index struct{
	Router *chi.Mux
}

func (i *Index) Init(){
	i.Router = chi.NewRouter()
	userRoutes := UserRoutes{}
	bankAccountRoutes := BankAccountRoutes{}

	userRoutes.Init()
	bankAccountRoutes.Init()
	
	i.Router.Mount("/users", userRoutes.Router)
	i.Router.Mount("/accounts", bankAccountRoutes.Router)
}