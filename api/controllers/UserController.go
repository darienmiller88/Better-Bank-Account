package controllers

import (
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/render"
)

type UserController struct{
	Router   *chi.Mux
}

func (u *UserController) Init(){
	u.Router = chi.NewRouter()

	u.Router.Get("/", func(res http.ResponseWriter, req *http.Request) {
		render.JSON(res, req, map[string]interface{}{
			"message": "Hello! From Docker 😊",
		})
	})
}
