package controllers

import (
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/render"
)

type UserController struct{
	Router   *chi.Mux
	users    []string
}

func (u *UserController) Init(){
	u.Router = chi.NewRouter()
	u.users = []string{"darien", "denise", "dalton"}

	u.Router.Get("/", func(res http.ResponseWriter, req *http.Request) {
		render.JSON(res, req, map[string]interface{}{
			"users": u.users,
		})
	})
}