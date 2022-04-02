package controllers

import (
	
	"github.com/go-chi/chi"
)

type MountController struct{
	Router *chi.Mux
}

func (m *MountController) Init(){
	m.Router = chi.NewRouter()
	userController := UserController{}

	userController.Init()

	m.Router.Mount("/users", userController.Router)
}