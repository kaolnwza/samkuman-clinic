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

func init()  {
	connectDB()
	
}

func GetInformation(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	information_collection := client.Database(database).Collection("information")

	var information_struct []models.Informaion
	//find user history

	cursor, err := information_collection.Find(ctx, bson.M{})
	if err != nil {
		fmt.Println(err)
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var temp models.Informaion
		cursor.Decode(&temp)
		information_struct = append(information_struct, temp)
	}
	fmt.Println("Information")
	json.NewEncoder(response).Encode(information_struct)
}
