package controllers

import (
	"net/http"
	
	"github.com/go-chi/chi"
	"github.com/unrolled/render"
)

type UserController struct{
	users  []string
	r      *render.Render
	Router *chi.Mux
}

func (u *UserController) Init(){
	u.users  = []string{"darienmiller88", "denise", "dalton"}
	u.r      = render.New()
	u.Router = chi.NewRouter()

	u.Router.Get("/", u.GetUsers)
}

func (u *UserController) GetUsers(res http.ResponseWriter, req *http.Request){
	u.r.JSON(res, http.StatusOK, map[string]interface{}{
		"users": u.users,
	})
}