package main

import (
	"fmt"
	"go-mongo/router"
	"go-mongo/services"
	"net/http"

	"github.com/gorilla/handlers"
	"go.mongodb.org/mongo-driver/mongo"
)

var client *mongo.Client

func main() {
	fmt.Println("Start GO")
	r := router.Router()
	ip := services.GetLocalIp()
	credentials := handlers.AllowCredentials()
	headers := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authirization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"})
	origins := handlers.AllowedOrigins([]string{ip})
	// origins := handlers.AllowedOrigins([]string{"http://localhost:19006"})

	http.ListenAndServe(":12345", handlers.CORS(credentials, headers, methods, origins)(r))
}
