package main

import (
	"fmt"
	"go-mongo/router"
	"net/http"

	"github.com/gorilla/handlers"
	"go.mongodb.org/mongo-driver/mongo"
)

var client *mongo.Client

func main() {
	fmt.Println("sdf")

	r := router.Router()

	headers := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authirization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"})
	origins := handlers.AllowedOrigins([]string{"*"})

	http.ListenAndServe(":12345", handlers.CORS(headers, methods, origins)(r))
}
