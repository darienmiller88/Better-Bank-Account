package controllers

import (
	"net/http"

	"github.com/go-chi/chi"
	// "github.com/go-chi/render"
	"gopkg.in/unrolled/render.v1"
)

type UserController struct{
	Router   *chi.Mux
	users    []string
	render   *render.Render
}

func (u *UserController) Init(){
	u.Router = chi.NewRouter()
	u.users = []string{"darien", "denise", "dalton"}
	u.render = render.New()

	u.Router.Get("/", func(res http.ResponseWriter, req *http.Request) {
		u.render.JSON(res, http.StatusOK, map[string]interface{}{
			"message": "Hello! From ",
			"users": u.users,
		})
	})
}
