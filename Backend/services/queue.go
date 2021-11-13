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

func AddQueue(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")
	var queue_struct models.Queue
	json.NewDecoder(request.Body).Decode(&queue_struct)

	queue_collection := client.Database(database).Collection("queue")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	//get queue range
	cursor, _ := queue_collection.Find(ctx, bson.M{})
	count := 1
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		count++
		//equal them
		var temp models.Queue
		cursor.Decode(&temp)
		if temp.User_id == queue_struct.User_id {
			json.NewEncoder(response).Encode("Cannot queue more than 1 time")
			return
		}
	}

	queue_struct.Queue_number = count
	queue_collection.InsertOne(ctx, queue_struct)

	result := bson.M{
		"msg":    "Complete Add Queue:",
		"Object": queue_struct}

	json.NewEncoder(response).Encode(result)
}

func UserCancelQueue(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")
	queue_collection := client.Database(database).Collection("queue")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	var queue_struct models.Queue
	json.NewDecoder(request.Body).Decode(&queue_struct)

	queue_collection.DeleteOne(ctx, bson.M{"queue_number": queue_struct.Queue_number})

	cursor, _ := queue_collection.Find(ctx, bson.D{{"queue_number", bson.D{{"$gt", queue_struct.Queue_number}}}})
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var temp models.Queue
		cursor.Decode(&temp)
		queue_collection.UpdateOne(
			ctx,
			bson.M{"queue_number": temp.Queue_number},
			bson.D{
				{"$set", bson.D{{"queue_number", temp.Queue_number - 1}}},
			},
		)
	}

	json.NewEncoder(response).Encode("queue canceled")

}

func ReachQueue(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")
	queue_collection := client.Database(database).Collection("queue")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	var queue_struct models.Queue
	json.NewDecoder(request.Body).Decode(&queue_struct)

	queue_collection.DeleteOne(ctx, bson.M{"queue_number": 1})

	cursor, _ := queue_collection.Find(ctx, bson.D{{"queue_number", bson.D{{"$gt", 1}}}})
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var temp models.Queue
		cursor.Decode(&temp)
		queue_collection.UpdateOne(
			ctx,
			bson.M{"queue_number": temp.Queue_number},
			bson.D{
				{"$set", bson.D{{"queue_number", temp.Queue_number - 1}}},
			},
		)
	}
	json.NewEncoder(response).Encode("queue has been removed")
}

func GetUserQueue(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")
	queue_collection := client.Database(database).Collection("queue")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	var queue_struct models.Queue
	json.NewDecoder(request.Body).Decode(&queue_struct)

	find_object := bson.M{"user_id": queue_struct.User_id}
	err := queue_collection.FindOne(ctx, find_object).Decode(&queue_struct)
	if err != nil {
		fmt.Println(err)
	}

	json.NewEncoder(response).Encode(queue_struct)

}
