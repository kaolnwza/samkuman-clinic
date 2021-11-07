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

func CreateUser(response http.ResponseWriter, request *http.Request) {

	_ = client
	fmt.Println("Create Function")
	response.Header().Add("content-type", "application/json")
	var user models.User

	json.NewDecoder(request.Body).Decode(&user)

	collection := client.Database("test").Collection("user")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	result, _ := collection.InsertOne(ctx, user)

	json.NewEncoder(response).Encode(result)
}

func GetUser(response http.ResponseWriter, request *http.Request) {
	fmt.Println("GET FUNC")
	response.Header().Add("content-type", "application/json")
	var getModel []models.User
	collection := client.Database("test").Collection("user")
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}
	//count := 0
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var getModel_2 models.User
		cursor.Decode(&getModel_2)
		getModel = append(getModel, getModel_2)
		//count++
	}
	if err := cursor.Err(); err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}

	json.NewEncoder(response).Encode(getModel)
}

func CallOnlyOneInOject(response http.ResponseWriter, request *http.Request) {
	//test
	response.Header().Add("content-type", "application/json")

	collection := client.Database("test").Collection("user")
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)

	//objectId, _ := primitive.ObjectIDFromHex("6171174184330dedf05e86a2")
	//fmt.Println(objectId)
	var result bson.M
	find_object := bson.M{"identity_number": "17639678245935"}
	err := collection.FindOne(ctx, find_object).Decode((&result))

	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}
	// for _, x := range result {
	// 	fmt.Println(x)
	// }

	toJson, _ := json.Marshal(result)
	//jjj := string(xxx)
	var reading models.User
	_ = json.Unmarshal([]byte(string(toJson)), &reading)
	fmt.Println(reading.ID)
	json.NewEncoder(response).Encode(reading.Firstname)

}

// func CreateHistory(response http.ResponseWriter, request *http.Request) {

// 	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)

// 	//get json from postman
// 	response.Header().Add("content-type", "application/json")
// 	// make getPostman is  History_Create struct
// 	var getPostman models.History_Create
// 	//get body from postman to getPostman
// 	json.NewDecoder(request.Body).Decode(&getPostman)
// 	// make variable to easy reading
// 	res_patient_id := getPostman.Patient_Id
// 	res_doctor_id := getPostman.Doctor_Id
// 	res_symptom := getPostman.Symptom
// 	res_doctor_advice := getPostman.Doctor_Advice

// 	//get user information
// 	user_collection := client.Database("test").Collection("user")
// 	var user_filter bson.M
// 	userObjectId, _ := primitive.ObjectIDFromHex(res_patient_id)
// 	_ = user_collection.FindOne(ctx, bson.M{"_id": userObjectId}).Decode(&user_filter) //send object that find to user_filter
// 	//something to json
// 	toJson_user, _ := json.Marshal(user_filter)
// 	//json to struct
// 	var user_struct models.User
// 	_ = json.Unmarshal([]byte(string(toJson_user)), &user_struct)

// 	// get doctor information
// 	doctor_collection := client.Database("test").Collection("doctor")
// 	var docter_filter bson.M
// 	doctorObjectId, _ := primitive.ObjectIDFromHex(res_doctor_id)
// 	_ = doctor_collection.FindOne(ctx, bson.M{"_id": doctorObjectId}).Decode(&docter_filter)
// 	//something to json
// 	toJson_doctor, _ := json.Marshal(docter_filter)
// 	//json to struct
// 	var doctor_struct models.Doctor
// 	_ = json.Unmarshal([]byte(string(toJson_doctor)), &doctor_struct)

// 	//append to History struct
// 	var history_struct models.History
// 	history_struct.Patient_Iden = user_struct.Identity_number
// 	history_struct.Patient_Firstname = user_struct.Firstname
// 	history_struct.Patient_Lastname = user_struct.Lastname
// 	history_struct.Doctor_Firstname = doctor_struct.Firstname
// 	history_struct.Doctor_Lastname = doctor_struct.Lastname
// 	history_struct.Symptom = res_symptom
// 	history_struct.Doctor_Advice = res_doctor_advice

// 	//get location of database
// 	history_collection := client.Database("test").Collection("history")
// 	//send History struct to
// 	insertStruct, _ := history_collection.InsertOne(ctx, history_struct)
// 	//send result to postman
// 	json.NewEncoder(response).Encode(insertStruct)
// }

func CreateTest2(response http.ResponseWriter, request *http.Request) {

	fmt.Println("Create Function")
	response.Header().Add("content-type", "application/json")
	var user models.Testza

	json.NewDecoder(request.Body).Decode(&user)

	collection := client.Database("test").Collection("za")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	result, _ := collection.InsertOne(ctx, user)

	json.NewEncoder(response).Encode(result)
}
