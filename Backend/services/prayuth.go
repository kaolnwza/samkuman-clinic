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

// func CallOnlyOneInOject(response http.ResponseWriter, request *http.Request) {
// 	//test
// 	response.Header().Add("content-type", "application/json")

// 	collection := client.Database("test").Collection("user")
// 	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)

// 	//objectId, _ := primitive.ObjectIDFromHex("6171174184330dedf05e86a2")
// 	//fmt.Println(objectId)
// 	var result bson.M
// 	find_object := bson.M{"identity_number": "17639678245935"}
// 	err := collection.FindOne(ctx, find_object).Decode((&result))

// 	if err != nil {
// 		response.WriteHeader(http.StatusInternalServerError)
// 		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
// 		return
// 	}
// 	// for _, x := range result {
// 	// 	fmt.Println(x)
// 	// }

// 	toJson, _ := json.Marshal(result)
// 	//jjj := string(xxx)
// 	var reading models.User
// 	_ = json.Unmarshal([]byte(string(toJson)), &reading)
// 	fmt.Println(reading.ID)
// 	json.NewEncoder(response).Encode(reading.Firstname)

// }

func Lnwza(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	collection := client.Database(database).Collection("user")

	var user_struct models.User
	//var user_struct2 models.User
	json.NewDecoder(request.Body).Decode(&user_struct)

	collection.FindOne(ctx, bson.M{"user_id": user_struct.User_id}).Decode(&user_struct)
	fmt.Println("kuy")
	json.NewEncoder(response).Encode(user_struct)

}
