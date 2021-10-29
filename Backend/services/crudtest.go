package services

import (
	"context"
	"encoding/json"
	"fmt"
	"go-mongo/models"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

func init() {
	connectDB()
}

// func main() {
// 	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
// 	client, _ = mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))
// 	_ = client
// }

func CreateTest(response http.ResponseWriter, request *http.Request) {

	_ = client
	fmt.Println("Create Function")
	response.Header().Add("content-type", "application/json")
	var person models.Person

	json.NewDecoder(request.Body).Decode(&person)
	collection := client.Database("test").Collection("za")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	result, _ := collection.InsertOne(ctx, person)

	json.NewEncoder(response).Encode(result)
}

func GetTest(response http.ResponseWriter, request *http.Request) {
	fmt.Println("GET FUNC")
	response.Header().Add("content-type", "application/json")
	var people []models.Person
	collection := client.Database("test").Collection("za")
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var person models.Person
		cursor.Decode(&person)
		people = append(people, person)
	}
	if err := cursor.Err(); err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}
	json.NewEncoder(response).Encode(people)
}

func DeleteTest(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")
	//var people []models.Person
	collection := client.Database("test").Collection("za")
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)

	asd := bson.M{"age": 0}
	deleteResult, _ := collection.DeleteOne(ctx, asd)
	json.NewEncoder(response).Encode(deleteResult)
}
