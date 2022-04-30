package auth

import (
	"fmt"
	"net/http"
	"os"

	"github.com/go-chi/jwtauth"
	"github.com/golang-jwt/jwt"
	"github.com/unrolled/render"
)

type jsonBody map[string]interface{}
var r *render.Render

func init() {
	r = render.New()
}

func Authenticate(next http.Handler) http.Handler {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {	
		tokenString := jwtauth.TokenFromCookie(req)

		if tokenString == ""{
			r.JSON(res, http.StatusForbidden, jsonBody{"errTokenValidation": "A token is required for authentication."})
			return
		}
		
		_, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
			}
	
			return []byte(os.Getenv("JWT_SECRET")), nil
		})

		if err != nil{
			r.JSON(res, http.StatusUnauthorized, jsonBody{"errTokenValidation": "Invalid Token! Please try again."})
			return
		}

		next.ServeHTTP(res, req)
	})
}