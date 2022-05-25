package middlewares

import (
	"context"
	"fmt"
	"net/http"
	"os"

	// "github.com/go-chi/jwtauth"
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
		cookie, err := req.Cookie("jwt")

		if err != nil {
			r.JSON(res, http.StatusForbidden, jsonBody{"errTokenValidation": "A token is required for authentication."})
			return
		}

		token, err := retrieveTokenFromCookie(cookie.Value)

		if err != nil {
			r.JSON(res, http.StatusUnauthorized, jsonBody{"errTokenAuthorization": err.Error()})
			return
		}

		//Parse the token and pull out the username from the token.
		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			req = req.WithContext(context.WithValue(req.Context(), "claims", claims))
		}

		next.ServeHTTP(res, req)
	})
}

func retrieveTokenFromCookie(tokenString string) (*jwt.Token, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if err != nil {
		return nil, fmt.Errorf("Invalid Token! Please try again.")
	}

	return token, nil
}
