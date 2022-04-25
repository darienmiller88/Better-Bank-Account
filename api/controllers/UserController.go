package controllers

import (
	"Better-Bank-Account/api/models"
	"net/http"

	"github.com/go-chi/chi"

	chi_render "github.com/go-chi/render"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"gopkg.in/unrolled/render.v1"
)

type j map[string]interface{}

var r *render.Render

func init() {
	r = render.New()
}

func GetUsers(res http.ResponseWriter, req *http.Request) {
	users := []j{}
	result, err := mgm.Coll(&models.User{}).Find(mgm.Ctx(), bson.D{})

	if err != nil {
		r.JSON(res, http.StatusOK, err.Error())
		return
	}

	if err := result.All(mgm.Ctx(), &users); err != nil {
		r.JSON(res, http.StatusInternalServerError, nil)
		return
	}

	r.JSON(res, http.StatusOK, users)
}

func GetUserByID(res http.ResponseWriter, req *http.Request) {
	id := chi.URLParam(req, "id")
	user := models.User{}

	if err := mgm.Coll(&models.User{}).FindByID(id, &user); err != nil {
		r.JSON(res, http.StatusNotFound, err.Error())
		return
	}

	r.JSON(res, http.StatusOK, user)
}

func PostUser(res http.ResponseWriter, req *http.Request) {
	user := models.User{}

	if err := chi_render.DecodeJSON(req.Body, &user); err != nil {
		r.JSON(res, http.StatusBadRequest, err.Error())
		return
	}

	if err := mgm.Coll(&models.User{}).Create(&user); err != nil {
		r.JSON(res, http.StatusInternalServerError, err.Error())
		return
	}

	r.JSON(res, http.StatusOK, user)
}

func DeleteUser(res http.ResponseWriter, req *http.Request){
	id := chi.URLParam(req, "id")
	objectId, err := primitive.ObjectIDFromHex(id)

	if err != nil{
		r.JSON(res, http.StatusBadRequest, err.Error())
		return
	}

	deleteResult, err := mgm.Coll(&models.User{}).DeleteOne(mgm.Ctx(), bson.M{"_id": objectId})

	if err != nil{
		r.JSON(res, http.StatusNotFound, err.Error())
		return
	}

	r.JSON(res, http.StatusOK, deleteResult)
}