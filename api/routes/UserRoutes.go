package routes

import (
	"Better-Bank-Account/api/controllers"
	"Better-Bank-Account/api/middlewares"
	"fmt"
	"net/http"
	"time"

	"github.com/go-chi/chi"
	"github.com/go-chi/httprate"
)

type UserRoutes struct{
	Router *chi.Mux
}

const minutes int = 1

func (u *UserRoutes) Init(){
	u.Router = chi.NewRouter()

	// u.Router.With(auth.Authenticate).Get("/", controllers.GetUsers)
	// u.Router.Delete("/{id}", controllers.DeleteUser)	
	u.Router.With(middlewares.Authenticate, middlewares.AuthUser).Get("/{username}", controllers.GetUserByUsername)
	u.Router.With(middlewares.Authenticate, middlewares.AuthUser).Get("/{username}/transfers", controllers.GetTransfers)
	u.Router.With(middlewares.Authenticate).Get("/checkauth", controllers.CheckAuth)
	u.Router.With(middlewares.ProtectSignin).Post("/auth/google", controllers.VerifyGoogleAuth)
	u.Router.With(middlewares.ProtectSignin).Post("/signup", controllers.Signup)
	u.Router.With(middlewares.ProtectSignin).Post("/signout", controllers.Signout)
	u.Router.With(
		middlewares.ProtectSignin,
		httprate.Limit(5, time.Duration(minutes)*time.Minute, httprate.WithLimitHandler(func(res http.ResponseWriter, req *http.Request) {
			http.Error(res, fmt.Sprintf("Too many login attempts. Please try again in %d minute(s)", minutes), http.StatusTooManyRequests)
		})),
	).Post("/signin", controllers.Signin)
}
