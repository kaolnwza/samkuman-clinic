package services

import (
	"context"
	"encoding/json"
	"go-mongo/models"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func init() {
	connectDB()
}

func AddQueue(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")
	var queue_struct models.Queue
	queue_struct.User_id = -1

	json.NewDecoder(request.Body).Decode(&queue_struct)

	if queue_struct.User_id == -1 {
		queue_struct.User_id = userCookieId
	}

	queue_collection := client.Database(database).Collection("queue")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	//get queue range
	queue_id := 1
	queue_remain := 0
	get_limit := 1
	cursor, _ := queue_collection.Find(ctx, bson.M{})
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		//equal them
		var temp models.Queue
		cursor.Decode(&temp)

		if get_limit >= 20 {
			json.NewEncoder(response).Encode("limit")
			return
		}

		if temp.User_id == queue_struct.User_id && temp.Status == true {
			json.NewEncoder(response).Encode("cannot queue")
			return
		}

		if temp.Type == queue_struct.Type {
			queue_id = temp.Queue_id + 1
			get_limit++
			if temp.Status == true {
				queue_remain++
			}
		}
	}

	queue_struct.Queue_id = queue_id
	queue_struct.Status = true
	queue_struct.Queue_remain = queue_remain
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
	queue_struct.User_id = -1

	json.NewDecoder(request.Body).Decode(&queue_struct)

	if queue_struct.User_id == -1 {
		queue_struct.User_id = userCookieId
	}

	err := queue_collection.FindOne(ctx, bson.M{"user_id": queue_struct.User_id, "status": true}).Decode(&queue_struct)
	if err != nil {
		json.NewEncoder(response).Encode("no_queue")
		return
	}

	//set false status
	queue_collection.UpdateOne(ctx,
		bson.M{"user_id": queue_struct.User_id, "type": queue_struct.Type, "status": true},
		bson.D{
			{"$set", bson.D{{"status", false}, {"queue_remain", -1}}},
		},
	)

	//config queue_remain
	cursor, _ := queue_collection.Find(ctx, bson.D{{"type", queue_struct.Type}, {"status", true}, {"queue_remain", bson.D{{"$gt", queue_struct.Queue_remain}}}})
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var temp models.Queue
		cursor.Decode(&temp)
		queue_collection.UpdateOne(
			ctx,
			bson.M{"user_id": temp.User_id, "type": temp.Type, "status": true},
			bson.D{
				{"$set", bson.D{{"queue_remain", temp.Queue_remain - 1}}},
			},
		)
	}

	json.NewEncoder(response).Encode("done")

}

func ReachQueue(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")
	queue_collection := client.Database(database).Collection("queue")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	var queue_struct models.Queue
	json.NewDecoder(request.Body).Decode(&queue_struct)

	queue_collection.UpdateOne(ctx,
		bson.M{"type": queue_struct.Type, "queue_remain": 0, "status": true},
		bson.D{
			{"$set", bson.D{{"status", false}, {"queue_remain", -1}}},
		})

	cursor, _ := queue_collection.Find(ctx, bson.D{{"type", queue_struct.Type}, {"queue_remain", bson.D{{"$gt", 0}}}, {"status", true}})
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var temp models.Queue
		cursor.Decode(&temp)
		queue_collection.UpdateOne(
			ctx,
			bson.M{"user_id": temp.User_id, "type": temp.Type, "status": true},
			bson.D{
				{"$set", bson.D{{"queue_remain", temp.Queue_remain - 1}}},
			},
		)
	}
	json.NewEncoder(response).Encode("queue has been removed")
}

func GetUserQueue(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("Content-Type", "application/json")
	queue_collection := client.Database(database).Collection("queue")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	//fmt.Println("in queue")
	var user_queue models.Queue
	user_queue.User_id = -1

	json.NewDecoder(request.Body).Decode(&user_queue)

	if user_queue.User_id == -1 {
		user_queue.User_id = userCookieId
	}
	//var hee bson.M

	//fmt.Println("type = ", user_queue)
	//fmt.Println("req = ", request)
	queue_collection.FindOne(ctx, bson.M{"status": true, "user_id": user_queue.User_id}).Decode(&user_queue)

	var current_queue models.Queue
	queue_collection.FindOne(ctx, bson.M{"status": true, "type": user_queue.Type, "queue_remain": 0}).Decode(&current_queue)

	jsonRes := bson.M{
		"user_queue":    user_queue.Queue_id,
		"current_queue": current_queue.Queue_id,
		"remain_queue":  user_queue.Queue_remain}

	json.NewEncoder(response).Encode(jsonRes)

}

func DropAllQueue(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")
	queue_collection := client.Database(database).Collection("queue")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	var queue_struct models.Queue
	json.NewDecoder(request.Body).Decode(&queue_struct)
	if queue_struct.Type == "all" {
		queue_collection.DeleteMany(ctx, bson.M{})
	} else {
		queue_collection.DeleteMany(ctx, bson.M{"type": queue_struct.Type})
	}

	json.NewEncoder(response).Encode("done")
}

func GetAllQueue(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")
	queue_collection := client.Database(database).Collection("queue")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	var queue_struct models.Queue
	var queue_struct_array []models.Queue

	json.NewDecoder(request.Body).Decode(&queue_struct)

	findOptions := options.Find()
	findOptions.SetSort(bson.D{{"type", 1}})

	cursor, _ := queue_collection.Find(ctx, bson.M{"status": true}, findOptions)

	count := 0
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		count++
		var temp models.Queue
		cursor.Decode(&temp)

		queue_struct_array = append(queue_struct_array, temp)

	}

	//fmt.Println(cursor)
	res_val := bson.M{
		"cursor": cursor,
		"struct": queue_struct_array}

	json.NewEncoder(response).Encode(res_val)

}

func GetRemainQueue(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")
	queue_collection := client.Database(database).Collection("queue")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	var queue_struct models.Queue
	var queue_response []models.Queue
	json.NewDecoder(request.Body).Decode(&queue_struct)

	cursor, _ := queue_collection.Find(ctx, bson.M{"type": queue_struct.Type, "queue_remain": 0})
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var temp models.Queue
		cursor.Decode(&temp)
		queue_response = append(queue_response, temp)

	}
	res_val := bson.M{
		"cursor": cursor,
		"struct": queue_response}

	json.NewEncoder(response).Encode(res_val)
}

func GetSymtomQueue(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("Content-Type", "application/json")
	queue_collection := client.Database(database).Collection("queue")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	//fmt.Println("in queue")
	var user_queue models.Queue

	json.NewDecoder(request.Body).Decode(&user_queue)

	//var hee bson.M

	//fmt.Println("type = ", user_queue)
	//fmt.Println("req = ", request)
	findOptions := options.Find()
	findOptions.SetSort(bson.D{{"_id", -1}})
	// fmt.Println("getsymqueue")
	var queue_arr []models.Queue
	cursor, _ := queue_collection.Find(ctx, bson.M{"user_id": user_queue.User_id, "status": false, "queue_remain": -1}, findOptions)
	count := 0
	defer cursor.Close(ctx)
	for cursor.Next((ctx)) {
		var temp models.Queue
		cursor.Decode(&temp)
		queue_arr = append(queue_arr, temp)
		count++
	}
	// fmt.Println(queue_arr)
	if count == 0 {
		json.NewEncoder(response).Encode("not_found")
		return
	}
	json.NewEncoder(response).Encode(queue_arr[0])

}

func GetQueueType(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("Content-Type", "application/json")
	queue_collection := client.Database(database).Collection("queue")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	//fmt.Println("in queue")
	var user_queue models.Queue

	json.NewDecoder(request.Body).Decode(&user_queue)

	//var hee bson.M

	//fmt.Println("type = ", user_queue)
	//fmt.Println("req = ", request)

	cursor, _ := queue_collection.Find(ctx, bson.M{"type": user_queue.Type, "status": true})
	count := 0
	defer cursor.Close(ctx)
	for cursor.Next((ctx)) {

		count++
	}

	json.NewEncoder(response).Encode(count)

}
