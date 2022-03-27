package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/joho/godotenv"
	"github.com/unrolled/render"
)

func main(){
	router := chi.NewRouter()
	r := render.New()
	err := godotenv.Load()

	if err != nil{
		log.Fatal("err loading .env")
	}


	router.Use(middleware.Logger)
	router.Get("/", func(res http.ResponseWriter, req *http.Request) {
		r.JSON(res, http.StatusOK, map[string]interface{}{
			"message": "hi!",
			"number": 456,
		})
	})

	fmt.Println("hii from lg gram")
	fmt.Println("running on port 8080")
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", os.Getenv("PORT")), router))	
}