package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/unrolled/render"
)

func main(){
	router := chi.NewRouter()
	r := render.New()

	router.Use(middleware.Logger)
	router.Get("/", func(res http.ResponseWriter, req *http.Request) {
		r.JSON(res, http.StatusOK, map[string]interface{}{
			"message": "hi!",
			"number": 5,
		})
	})

	fmt.Println()
	fmt.Println("running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", router))	
}