package routes

import (
	"Better-Bank-Account/api/controllers"
	"Better-Bank-Account/api/middlewares"

	"github.com/go-chi/chi"
)

type UserRoutes struct{
	Router *chi.Mux
}

func (u *UserRoutes) Init(){
	u.Router = chi.NewRouter()

	// u.Router.With(auth.Authenticate).Get("/", controllers.GetUsers)
	// u.Router.Delete("/{id}", controllers.DeleteUser)	
	u.Router.With(middlewares.Authenticate, middlewares.AuthUser).Get("/{username}", controllers.GetUserByUsername)
	u.Router.With(middlewares.Authenticate).Get("/checkauth", controllers.CheckAuth)
	u.Router.With(middlewares.ProtectSignin).Post("/signup", controllers.Signup)
	u.Router.With(middlewares.ProtectSignin).Post("/signin", controllers.Signin)
	u.Router.With(middlewares.ProtectSignin).Post("/signout", controllers.Signout)
}
