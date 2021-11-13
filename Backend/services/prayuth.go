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

func Kuy(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	history_collection := client.Database(database).Collection("history")

	var get_data models.History
	json.NewDecoder(request.Body).Decode(&get_data)
	var history_struct []models.History
	//find user history

	cursor, err := history_collection.Find(ctx, bson.M{"user.user_id": get_data.User_id})
	if err != nil {
		fmt.Println(err)
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var temp models.History
		cursor.Decode(&temp)
		history_struct = append(history_struct, temp)
	}
	fmt.Println("HEEEEEE")
	json.NewEncoder(response).Encode(history_struct)
}
