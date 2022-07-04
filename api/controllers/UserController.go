package controllers

import (
	"Better-Bank-Account/api/models"
	"context"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/go-chi/chi"
	"github.com/golang-jwt/jwt"
	"google.golang.org/api/idtoken"

	"github.com/go-chi/jwtauth"
	chi_render "github.com/go-chi/render"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"

	"golang.org/x/crypto/bcrypt"
	"gopkg.in/unrolled/render.v1"
)

type jsonBody map[string]interface{}

var r *render.Render
var tokenAuth *jwtauth.JWTAuth

const standardSessionLen int = 5000       //5000 seconds or 83 minutes
const persistentSessionLen int = 31536000 //One year cookie for the "remember me" option.

func init() {
	r = render.New()
}

func VerifyGoogleAuth(res http.ResponseWriter, req *http.Request) {
	googleInfo := jsonBody{}

	if err := chi_render.DecodeJSON(req.Body, &googleInfo); err != nil {
		r.JSON(res, http.StatusBadRequest, err.Error())
		return
	}

	googleToken := googleInfo["tokenId"].(string)
	payload, err := idtoken.Validate(context.Background(), googleToken, os.Getenv("CLIENT_ID"))

	if err != nil {
		r.JSON(res, http.StatusBadRequest, err.Error())
		return
	}

	user := models.User{}
	err = mgm.Coll(&models.User{}).FindOne(context.Background(), bson.M{"google_username": payload.Claims["name"]}).Decode(&user)
	
	//If there were no users found with the google username passed through the payload, insert them into the database.
	if err == mongo.ErrNoDocuments{
		user.GoogleUsername = payload.Claims["name"].(string)
		user.Username       = googleInfo["googleId"].(string);
		user.LastSignin     = time.Now()
		user.BankAccounts   = []models.Account{}
		user.Transfers      = []models.Transfer{}
		
		if err := mgm.Coll(&models.User{}).Create(&user); err != nil{
			r.JSON(res, http.StatusInternalServerError, err) 
			return
		}
	}
	
	result, err := mgm.Coll(&models.User{}).UpdateOne(mgm.Ctx(), bson.M{"google_username": payload.Claims["name"]}, bson.M{
		"$set": bson.M{"last_signin": time.Now()},
	})

	setCookie(googleToken, int(payload.Expires), res)
	r.JSON(res, http.StatusOK, result)
}

func CheckAuth(res http.ResponseWriter, req *http.Request) {
	r.JSON(res, http.StatusOK, jsonBody{"message": "Signed in."})
}

func GetUsers(res http.ResponseWriter, req *http.Request) {
	users := []jsonBody{}
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

func GetUserByUsername(res http.ResponseWriter, req *http.Request) {
	r.JSON(res, http.StatusOK, req.Context().Value("user"))
}

func GetTransfers(res http.ResponseWriter, req *http.Request) {
	r.JSON(res, http.StatusOK, req.Context().Value("user").(models.User).Transfers)
}

func Signup(res http.ResponseWriter, req *http.Request) {
	user := models.User{}

	if err := chi_render.DecodeJSON(req.Body, &user); err != nil {
		r.JSON(res, http.StatusBadRequest, err)
		return
	}

	if err := user.Validate(); err != nil {
		r.JSON(res, http.StatusBadRequest, err)
		return
	}

	possibleUser := models.User{}
	err := mgm.Coll(&models.User{}).FindOne(mgm.Ctx(), bson.M{"username": user.Username}).Decode(&possibleUser)

	if err != nil && err != mongo.ErrNoDocuments {
		r.JSON(res, http.StatusInternalServerError, err)
		return
	}

	// If the username that the user tried to sign up with already exists, throw an error signaling this.
	if possibleUser.Username == user.Username {
		r.JSON(res, http.StatusBadRequest, jsonBody{
			"errUsernameTaken": fmt.Sprintf("Username \"%s\" taken! Please choose another one.", user.Username),
		})

		return
	}

	//Afterwards, create the new user and add them to the "users" database.
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(user.Password), 12)
	user.Password = string(hashedPassword)
	user.BankAccounts = []models.Account{}
	user.Transfers = []models.Transfer{}

	if err := mgm.Coll(&models.User{}).Create(&user); err != nil {
		r.JSON(res, http.StatusInternalServerError, err)
		return
	}

	user.LastSignin = time.Now()
	tokenString, expiry := getJwtToken(user)

	setCookie(tokenString, expiry, res)
	r.JSON(res, http.StatusOK, jsonBody{"message": "sign up successful."})
}

func Signin(res http.ResponseWriter, req *http.Request) {
	user := models.User{}

	if err := chi_render.DecodeJSON(req.Body, &user); err != nil {
		http.Error(res, err.Error(), http.StatusInternalServerError)
		return
	}

	possibleUser := models.User{}
	err := mgm.Coll(&models.User{}).FindOne(mgm.Ctx(), bson.M{"username": user.Username}).Decode(&possibleUser)

	if err != nil && err != mongo.ErrNoDocuments {
		http.Error(res, err.Error(), http.StatusInternalServerError)
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(possibleUser.Password), []byte(user.Password)); err != nil {
		http.Error(res, "Username or Password not connected to any account. Please try again.", http.StatusUnauthorized)
		return
	}

	mgm.Coll(&models.User{}).UpdateOne(mgm.Ctx(), bson.M{"username": user.Username}, bson.M{
		"$set": bson.M{"last_signin": time.Now()},
	})


	tokenString, expiry := getJwtToken(user)
	setCookie(tokenString, expiry, res)
	r.JSON(res, http.StatusOK, jsonBody{"message": "Sign in success!"})
}

func Signout(res http.ResponseWriter, req *http.Request) {
	setCookie("", -1, res)
	r.JSON(res, http.StatusOK, jsonBody{"message": "signing out"})
}

func getJwtToken(user models.User) (string, int){
	sessionLen := 0

	if user.RememberMe {
		sessionLen = persistentSessionLen
	} else {
		sessionLen = standardSessionLen
	}

	expiry := time.Now().Add(time.Duration(sessionLen) * time.Second)
	tokenString, _ := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": user.Username,
		"exp"     : expiry.Unix(),
	}).SignedString([]byte(os.Getenv("JWT_SECRET")))

	return tokenString, sessionLen
}

func setCookie(tokenString string, expiry int, res http.ResponseWriter) {
	http.SetCookie(res, &http.Cookie{
		Name:     "jwt",
		Path:     "/",
		HttpOnly: true,
		Value:    tokenString,
		MaxAge:   expiry,
		SameSite: http.SameSiteNoneMode,
		Secure:   true,
		//Domain:   "better-bank-account-api.herokuapp.com",
	})
}

func refresh() {

}

func DeleteUser(res http.ResponseWriter, req *http.Request) {
	objectId, err := primitive.ObjectIDFromHex(chi.URLParam(req, "id"))

	if err != nil {
		r.JSON(res, http.StatusBadRequest, err.Error())
		return
	}

	deleteResult, err := mgm.Coll(&models.User{}).DeleteOne(mgm.Ctx(), bson.M{"_id": objectId})

	if err != nil {
		r.JSON(res, http.StatusNotFound, err.Error())
		return
	}

	r.JSON(res, http.StatusOK, deleteResult)
}
