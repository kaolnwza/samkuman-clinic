package main

import (
	//"fmt"

	"fmt"
	"net/http"
	"test/router"

	"github.com/gorilla/handlers"
	"go.mongodb.org/mongo-driver/mongo"
	// "go.mongodb.org/mongo-driver/mongo/readpref"
)

var client *mongo.Client

func main() {
	//connection db
	fmt.Println("kuy")
	// ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	// client, _ = mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))
	// _ = client
	//db := client.Database("test").Collection("za")
	//defer client.Disconnect(ctx)
	r := router.Router()

	headers := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authirization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"})
	origins := handlers.AllowedOrigins([]string{"*"})

	http.ListenAndServe(":12345", handlers.CORS(headers, methods, origins)(r))

}

// func CreateZa(response http.ResponseWriter, request *http.Request){
// 	response.Header().Add("content-type", "application/json")
// 	var user User
// 	json.NewDecoder(request.Body).Decode(&za)
// 	collection := client.Database("th")
// }
