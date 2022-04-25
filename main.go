package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/go-chi/chi"
	"github.com/go-chi/render"
	"github.com/joho/godotenv"
	"Better-Bank-Account/api/controllers"
)

func main(){
	godotenv.Load()
	router := chi.NewRouter()
	index := controllers.Index{}

	index.Init()

	router.Mount("/api/v1", index.Router)
	router.Get("/", func(res http.ResponseWriter, req *http.Request) {
		render.JSON(res, req, map[string]interface{}{
			"number from": 600,
		})
	})

	fmt.Println("running on port:", os.Getenv("PORT"))
	http.ListenAndServe(fmt.Sprintf(":%s", os.Getenv("PORT")), router)
}