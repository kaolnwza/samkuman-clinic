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

// func AddHistory_old(response http.ResponseWriter, request *http.Request) {
// 	response.Header().Add("content-type", "application/json")
// 	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
// 	history_collection := client.Database(database).Collection("history")
// 	user_collection := client.Database(database).Collection("user")
// 	doctor_collection := client.Database(database).Collection("doctor")

// 	var history_struct models.History
// 	json.NewDecoder(request.Body).Decode(&history_struct)

// 	//get user information
// 	user_collection.FindOne(ctx, bson.M{"user_id": history_struct.User.User_id}).Decode(&history_struct.User)
// 	//get doctor information
// 	doctor_collection.FindOne(ctx, bson.M{"doctor_id": history_struct.Doctor.Doctor_id}).Decode(&history_struct.Doctor)

// 	//find colletion range for make history_id
// 	cursor, _ := history_collection.Find(ctx, bson.M{})
// 	count := 0
// 	defer cursor.Close(ctx)
// 	for cursor.Next(ctx) {
// 		count++
// 	}
// 	history_struct.History_id = count
// 	history_struct.Date = time.Now()

// 	fmt.Println("Done of add history")

// 	history_collection.InsertOne(ctx, history_struct)

// 	json.NewEncoder(response).Encode(history_struct)

// }

func AddHistory(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	history_collection := client.Database(database).Collection("history")

	var history_struct models.History
	json.NewDecoder(request.Body).Decode(&history_struct)

	//find colletion range for make history_id
	cursor, _ := history_collection.Find(ctx, bson.M{})
	history_id := 0
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		history_id++
	}
	history_struct.History_id = history_id
	history_struct.Date = time.Now()

	fmt.Println("Done of add history")

	history_collection.InsertOne(ctx, history_struct)

	json.NewEncoder(response).Encode(history_struct)

}

func GetHistory(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	history_collection := client.Database(database).Collection("history")

	var get_data models.History
	get_data.User_id = -1
	json.NewDecoder(request.Body).Decode(&get_data)

	if get_data.User_id == -1 {
		get_data.User_id = userCookieId
	}

	var history_struct []models.History
	//find user history

	cursor, err := history_collection.Find(ctx, bson.M{"user_id": get_data.User_id})
	if err != nil {
		fmt.Println(err)
	}
	doctor_collection := client.Database(database).Collection("doctor")
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var temp models.History
		cursor.Decode(&temp)
		var docst models.Doctor
		doctor_collection.FindOne(ctx, bson.M{"doctor_id": temp.Doctor.Doctor_id}).Decode(&docst)
		docst.Doctor_Password = ""
		temp.Doctor = docst
		history_struct = append(history_struct, temp)
	}

	// var doctor_struct models.Doctor
	// doctor_collection := client.Database(database).Collection("doctor")
	// doctor_collection.FindOne()

	json.NewEncoder(response).Encode(history_struct)
}
