package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"Better-Bank-Account/api/controllers"
	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
	"github.com/go-chi/chi/middleware"
	"github.com/joho/godotenv"
	"github.com/unrolled/render"
)

func main(){
	router := chi.NewRouter()
	r := render.New()
	err := godotenv.Load()
	index := controllers.MountController{}

	if err != nil{
		fmt.Println("err: loading .env")
	}
	
	router.Use(middleware.Logger)
	router.Use(cors.AllowAll().Handler)

	//Initialize the index controller, and mount it on "api/v1"
	index.Init()
	router.Mount("/api/v1", index.Router)

	router.Get("/", func(res http.ResponseWriter, req *http.Request) {
		r.JSON(res, http.StatusOK, map[string]interface{}{
			"message": "hi!",
			"number": 456,
		})
	})

	fmt.Println("hii from lg gram")
	fmt.Println("running on port 8080")
	log.Fatal(http.ListenAndServe(":" + os.Getenv("PORT"), router))	
}