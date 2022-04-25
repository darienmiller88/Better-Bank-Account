package routes

import (
	"Better-Bank-Account/api/controllers"

	"github.com/go-chi/chi"
)

type UserRoutes struct{
	Router *chi.Mux
}

func (u *UserRoutes) Init(){
	u.Router = chi.NewRouter()

	u.Router.Get("/", controllers.GetUsers)
	u.Router.Post("/", controllers.PostUser)
	u.Router.Get("/{id}", controllers.GetUserByID)
	u.Router.Delete("/{id}", controllers.DeleteUser)
}
