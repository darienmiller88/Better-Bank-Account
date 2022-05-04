package main

import (
	"fmt"
	"net/http"
	"os"

	"Better-Bank-Account/api/routes"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
	"github.com/kamva/mgm/v3"

	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	godotenv.Load()
	router := chi.NewRouter()
	index := routes.Index{}
	err := mgm.SetDefaultConfig(nil, "BankProgram", options.Client().ApplyURI(os.Getenv("MONGO_URI")))

	if err != nil {
		panic(err)
	}

	index.Init()
	newCors := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000", "https://millerbank.netlify.app"},
		AllowCredentials: true,
	}) 
	router.Use(newCors.Handler)
	router.Use(middleware.Logger)
	router.Mount("/api/v1", index.Router) 

	fmt.Println("running on port:", os.Getenv("PORT"))
	http.ListenAndServe(fmt.Sprintf(":%s", os.Getenv("PORT")), router)
}