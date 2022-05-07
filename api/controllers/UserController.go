package controllers

import (
	"Better-Bank-Account/api/models"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/go-chi/chi"

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
const sessionLen int = 5000 //5000 seconds or 10 minutes

func init() {
	r = render.New()
}

func CheckAuth(res http.ResponseWriter, req *http.Request){
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

	if err := mgm.Coll(&models.User{}).Create(&user); err != nil {
		r.JSON(res, http.StatusInternalServerError, err)
		return
	}

	user.LastSignin = time.Now()
	setCookie(user, res, req)
	r.JSON(res, http.StatusOK, user)
}

func Signin(res http.ResponseWriter, req *http.Request) {
	user := models.User{}
	fmt.Println("host:", req.Host)

	if strings.HasPrefix(req.Host, "localhost"){
		fmt.Println("on localhost")
	}else{
		fmt.Println("not on local host")
	}

	if err := chi_render.DecodeJSON(req.Body, &user); err != nil {
		r.JSON(res, http.StatusBadRequest, err)
		return
	}

	possibleUser := models.User{}
	err := mgm.Coll(&models.User{}).FindOne(mgm.Ctx(), bson.M{"username": user.Username}).Decode(&possibleUser)

	if err != nil && err != mongo.ErrNoDocuments {
		r.JSON(res, http.StatusInternalServerError, err)
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(possibleUser.Password), []byte(user.Password)); err != nil {
		r.JSON(res, http.StatusUnauthorized, jsonBody{
			"errInvalidLogin": "Username or Password not connected to any account. Please try again.",
		})
		return
	}

	mgm.Coll(&models.User{}).UpdateOne(mgm.Ctx(), bson.M{"username": user.Username}, bson.M{
		"$set": bson.M{"last_signin": time.Now()},
	})

	setCookie(user, res, req)
	r.JSON(res, http.StatusOK, jsonBody{"message": "Sign in success!"})
}

func Signout(res http.ResponseWriter, req *http.Request) {
	http.SetCookie(res, &http.Cookie{
		Name:     "jwt",
		Path:     "/",
		MaxAge:  -1,
	})

	r.JSON(res, http.StatusOK, jsonBody{"message": "signing out"})
}

func setCookie(user models.User, res http.ResponseWriter, req *http.Request) {
	expiry := time.Now().Add(time.Duration(sessionLen) * time.Second)
	tokenAuth = jwtauth.New("HS256", []byte(os.Getenv("JWT_SECRET")), nil)
	_, tokenString, _ := tokenAuth.Encode(jsonBody{
		"username": user.Username,
		"exp":  expiry.Unix(),
	})

	var domainName string

	if strings.HasPrefix(req.Host, "localhost"){
		domainName = "localhost"
	}else{
		domainName = req.Host
	}

	//Finally, add a cookie with the jwt as the value
	http.SetCookie(res, &http.Cookie{
		Name:     "jwt",
		Path:     "/",
		HttpOnly: true,
		Value:    tokenString,
		Expires:  expiry,
		SameSite: http.SameSiteStrictMode,
		Secure:   true,
		Domain:   domainName,
	})
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
