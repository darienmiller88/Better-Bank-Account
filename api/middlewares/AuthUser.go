package middlewares

import (
	"context"
	"fmt"
	"net/http"

	"Better-Bank-Account/api/models"

	"github.com/go-chi/chi"
	"github.com/golang-jwt/jwt"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
)

//Unlike the first auth middleware, this will ensure that the user currently logged in cannot request information
//from other users using the url params. It will also pass along the user model from the database using the 
//username supplied with the token string.
func AuthUser(next http.Handler) http.Handler{
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		usernameFromContext  := req.Context().Value("claims").(jwt.MapClaims)["username"].(string)
		usernameFromURLParam := chi.URLParam(req, "username")
		user := models.User{}
		err  := mgm.Coll(&models.User{}).FindOne(mgm.Ctx(), bson.M{"username": usernameFromURLParam}).Decode(&user)

		if err != nil{
			r.JSON(res, http.StatusNotFound, jsonBody{"errUserNotFound": fmt.Sprintf("User %s not found.", usernameFromURLParam)})
			return
		}

		if usernameFromContext != usernameFromURLParam{
			r.JSON(res, http.StatusUnauthorized, jsonBody{"errUnauthorizedUser": fmt.Sprintf("Please login to view information from user %s.", usernameFromURLParam)})
			return
		}

		req = req.WithContext(context.WithValue(req.Context(), "user", user))
		next.ServeHTTP(res, req)
	})
}