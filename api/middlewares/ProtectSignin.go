package middlewares

import (
	"net/http"
	"strings"

	"github.com/go-chi/jwtauth"
)

func ProtectSignin(next http.Handler) http.Handler{
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		pageHit    := strings.HasSuffix(req.URL.String(), "/signin") || strings.HasSuffix(req.URL.String(), "/signup")
		_, err := retrieveTokenFromCookie(jwtauth.TokenFromCookie(req))

		//If the user tried to access either the sign in or sign up route while already logged in, prevent
		//them from doing so.
		if pageHit && err == nil{
			r.JSON(res, http.StatusUnauthorized, jsonBody{"errSignedIn": "Cannot access /signin or /signup while logged in."})
			return
		}

		next.ServeHTTP(res, req)
	})
}