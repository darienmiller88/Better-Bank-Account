package routes

import (
	"Better-Bank-Account/api/controllers"
	"Better-Bank-Account/api/auth"

	"github.com/go-chi/chi"
)

type UserRoutes struct{
	Router *chi.Mux
}

func (u *UserRoutes) Init(){
	u.Router = chi.NewRouter()

	u.Router.With(auth.Authenticate).Get("/", controllers.GetUsers)
	u.Router.With(auth.Authenticate).Get("/{id}", controllers.GetUserByID)
	u.Router.With(auth.Authenticate).Get("/test", controllers.GetTest)
	u.Router.Delete("/{id}", controllers.DeleteUser)	
	u.Router.Post("/signup", controllers.Signup)
	u.Router.Post("/signin", controllers.Signin)
	u.Router.Post("/signout", controllers.Signout)
}
