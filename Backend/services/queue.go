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
	cursor, _ := queue_collection.Find(ctx, bson.M{})
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		//equal them
		var temp models.Queue
		cursor.Decode(&temp)
		if temp.User_id == queue_struct.User_id && temp.Status == true {
			json.NewEncoder(response).Encode("cannot queue")
			return
		}

		if temp.Status == true {
			queue_remain++
		}
		queue_id++

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

// func AddQueue2(response http.ResponseWriter, request *http.Request) {
// 	response.Header().Add("content-type", "application/json")
// 	var queue_struct models.Queue
// 	json.NewDecoder(request.Body).Decode(&queue_struct)

// 	queue_collection := client.Database(database).Collection("queue")
// 	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

// 	//get queue range
// 	cursor, _ := queue_collection.Find(ctx, bson.M{"type": queue_struct.Type})
// 	queue_number := 1
// 	defer cursor.Close(ctx)
// 	for cursor.Next(ctx) {
// 		//equal them
// 		var temp models.Queue
// 		cursor.Decode(&temp)
// 		if temp.Type == queue_struct.Type {
// 			queue_number++
// 		}
// 		if temp.User_id == queue_struct.User_id {
// 			json.NewEncoder(response).Encode("Cannot queue more than 1 time")
// 			return
// 		}

// 	}

// 	queue_id := 1
// 	cursor_countq, _ := queue_collection.Find(ctx, bson.M{"type": queue_struct.Type})
// 	defer cursor_countq.Close(ctx)
// 	for cursor_countq.Next(ctx) {
// 		queue_id++
// 	}

// 	queue_struct.Queue_number = queue_number
// 	queue_struct.Queue_id = queue_id
// 	queue_struct.Status = true
// 	queue_collection.InsertOne(ctx, queue_struct)

// 	result := bson.M{
// 		"msg":    "Complete Add Queue:",
// 		"Object": queue_struct}

// 	json.NewEncoder(response).Encode(result)
// }

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

// func UserCancelQueue2(response http.ResponseWriter, request *http.Request) {
// 	response.Header().Add("content-type", "application/json")
// 	queue_collection := client.Database(database).Collection("queue")
// 	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

// 	var queue_struct models.Queue
// 	json.NewDecoder(request.Body).Decode(&queue_struct)

// 	err := queue_collection.FindOne(ctx, bson.M{"user_id": queue_struct.User_id, "type": queue_struct.Type}).Decode(&queue_struct)
// 	if err != nil {
// 		json.NewEncoder(response).Encode("no_queue")
// 		return
// 	}

// 	queue_collection.DeleteOne(ctx, bson.M{"user_id": queue_struct.User_id, "type": queue_struct.Type})

// 	cursor, _ := queue_collection.Find(ctx, bson.D{{"type", queue_struct.Type}, {"queue_number", bson.D{{"$gt", queue_struct.Queue_number}}}})
// 	defer cursor.Close(ctx)
// 	for cursor.Next(ctx) {
// 		var temp models.Queue
// 		cursor.Decode(&temp)
// 		queue_collection.UpdateOne(
// 			ctx,
// 			bson.M{"user_id": temp.User_id, "type": temp.Type},
// 			bson.D{
// 				{"$set", bson.D{{"queue_number", temp.Queue_number - 1}}},
// 			},
// 		)
// 	}

// 	json.NewEncoder(response).Encode("queue canceled")

// }

// func FindType(response http.ResponseWriter, request *http.Request) {
// 	response.Header().Add("content-type", "application/json")
// 	queue_collection := client.Database(database).Collection("queue")
// 	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

// 	var queue_struct models.Queue
// 	var queue_struct2 []models.Queue
// 	json.NewDecoder(request.Body).Decode(&queue_struct)

// 	queue_collection.FindOne(ctx, bson.M{"user_id": queue_struct.User_id, "type": queue_struct.Type}).Decode(&queue_struct)

// 	//queue_collection.DeleteOne(ctx, bson.M{"user_id": queue_struct.User_id, "type": queue_struct.Type})

// 	cursor, _ := queue_collection.Find(ctx, bson.D{{"type", queue_struct.Type}, {"queue_number", bson.D{{"$gt", queue_struct.Queue_number}}}})
// 	defer cursor.Close(ctx)
// 	for cursor.Next(ctx) {
// 		var temp models.Queue
// 		cursor.Decode(&temp)
// 		queue_struct2 = append(queue_struct2, temp)

// 	}

// 	json.NewEncoder(response).Encode(queue_struct2)

//}

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
			bson.M{"user_id": temp.User_id, "type": temp.Type},
			bson.D{
				{"$set", bson.D{{"queue_remain", temp.Queue_remain - 1}}},
			},
		)
	}
	json.NewEncoder(response).Encode("queue has been removed")
}

// func ReachQueue(response http.ResponseWriter, request *http.Request) {
// 	response.Header().Add("content-type", "application/json")
// 	queue_collection := client.Database(database).Collection("queue")
// 	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

// 	var queue_struct models.Queue
// 	json.NewDecoder(request.Body).Decode(&queue_struct)

// 	queue_collection.DeleteOne(ctx, bson.M{"type": queue_struct.Type, "queue_number": 1})

// 	cursor, _ := queue_collection.Find(ctx, bson.D{{"type", queue_struct.Type}, {"queue_number", bson.D{{"$gt", 1}}}})
// 	defer cursor.Close(ctx)
// 	for cursor.Next(ctx) {
// 		var temp models.Queue
// 		cursor.Decode(&temp)
// 		queue_collection.UpdateOne(
// 			ctx,
// 			bson.M{"user_id": temp.User_id, "type": temp.Type},
// 			bson.D{
// 				{"$set", bson.D{{"queue_number", temp.Queue_number - 1}}},
// 			},
// 		)
// 	}
// 	json.NewEncoder(response).Encode("queue has been removed")
// }

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

// func GetUserQueue(response http.ResponseWriter, request *http.Request) {
// 	response.Header().Add("content-type", "application/json")
// 	queue_collection := client.Database(database).Collection("queue")
// 	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

// 	var queue_struct models.Queue
// 	json.NewDecoder(request.Body).Decode(&queue_struct)

// 	find_object := bson.M{"type": queue_struct.Type}
// 	cursor, _ := queue_collection.Find(ctx, find_object)
// 	var user_queue int
// 	remain_queue := 1
// 	defer cursor.Close(ctx)
// 	for cursor.Next(ctx) {
// 		var temp models.Queue
// 		cursor.Decode(&temp)
// 		remain_queue++
// 		if temp.User_id == queue_struct.User_id {
// 			user_queue = temp.Queue_number
// 		}
// 	}

// 	jsonRes := bson.M{
// 		"user_queue":   user_queue,
// 		"remain_queue": remain_queue}

// 	json.NewEncoder(response).Encode(jsonRes)

// }

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
	// Sort by `price` field descending
	findOptions.SetSort(bson.D{{"type", 1}})

	cursor, _ := queue_collection.Find(ctx, bson.M{"status": true}, findOptions)
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var temp models.Queue
		cursor.Decode(&temp)
		queue_struct_array = append(queue_struct_array, temp)

	}

	json.NewEncoder(response).Encode(queue_struct_array)

}
