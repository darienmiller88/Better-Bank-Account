package controllers

import(
	"github.com/go-chi/chi"

)

type Index struct{
	Router *chi.Mux
}

func (i *Index) Init(){
	i.Router = chi.NewRouter()
	userController := UserController{}

	userController.Init()
	
	i.Router.Mount("/users", userController.Router)
}