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

func CreateDoctor(response http.ResponseWriter, request *http.Request) {

	_ = client
	fmt.Println("Create Function")
	response.Header().Add("content-type", "application/json")
	var doctor models.Doctor

	json.NewDecoder(request.Body).Decode(&doctor)
	collection := client.Database("test").Collection("doctor")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	result, _ := collection.InsertOne(ctx, doctor)

	json.NewEncoder(response).Encode(result)
}

func GetDoctor(response http.ResponseWriter, request *http.Request) {
	fmt.Println("GET FUNC")
	response.Header().Add("content-type", "application/json")
	var getModel []models.Doctor
	collection := client.Database("test").Collection("doctor")
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var getModel_2 models.Doctor
		cursor.Decode(&getModel_2)
		getModel = append(getModel, getModel_2)
	}
	if err := cursor.Err(); err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}
	json.NewEncoder(response).Encode(getModel)
}
