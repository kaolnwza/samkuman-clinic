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

func AddAppointment(response http.ResponseWriter, request *http.Request) {

	response.Header().Add("content-type", "application/json")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	appointment_collection := client.Database(database).Collection("appointment") // รับข้อมูลมาจาก DB
	var appointment_structure models.Appointment
	json.NewDecoder(request.Body).Decode(&appointment_structure) // รับข้อมูลจาก PM ลงมาใน structure

	user_collection := client.Database(database).Collection("user") // รับข้อมูลมาจาก DB
	user_collection.FindOne(ctx, bson.M{"user_id": appointment_structure.User_id}).Decode(&appointment_structure)

	doctor_collection := client.Database(database).Collection("doctor") // รับข้อมูลมาจาก DB
	doctor_collection.FindOne(ctx, bson.M{"doctor_id": appointment_structure.Doctor_id}).Decode(&appointment_structure)

	cursor, _ := appointment_collection.Find(ctx, bson.M{})
	count := 1
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		count++
	}
	appointment_structure.Appointment_id = count
	appointment_structure.Status = false
	fmt.Println(appointment_structure)
	res, err := appointment_collection.InsertOne(ctx, appointment_structure) // inset ข้อมูลลง DB
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("add appointment success", res)
	json.NewEncoder(response).Encode(appointment_structure) //แสดงใน PM
}

func GetAppointment(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	appointment_collection := client.Database(database).Collection("appointment") //ดึงมาจาก DB

	// var get_data models.Appointment
	// json.NewDecoder(request.Body).Decode(&get_data)
	var appointment_struct []models.Appointment

	//Find user appointment
	cursor, err := appointment_collection.Find(ctx, bson.M{"user_id": userCookieId})
	if err != nil {
		fmt.Println(err)
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var temp models.Appointment
		cursor.Decode(&temp)
		appointment_struct = append(appointment_struct, temp)
	}
	json.NewEncoder(response).Encode(appointment_struct)
}

func UpdateAppointment(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	appointment_collection := client.Database(database).Collection("appointment") //ดึงมาจาก DB

	var appointment_struct models.Appointment                 //กำหนดตัวแปลที่จะเข้าถึงใน structure
	json.NewDecoder(request.Body).Decode(&appointment_struct) // รับข้อมูลจาก PM ลงมาใน structure

	fmt.Println(appointment_struct.Date)
	rr, _ := appointment_collection.UpdateOne(
		ctx,
		bson.M{"appointment_id": appointment_struct.Appointment_id},
		bson.D{
			{"$set", bson.D{{"date", appointment_struct.Date}}},
		},
	)
	// if err != nil {
	// 	// fmt.Println(rr)
	// }

	fmt.Println(rr)
	json.NewEncoder(response).Encode("Update") //แสดงใน PM

}

func DeleteAppointment(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	appointment_collection := client.Database(database).Collection("appointment") //ดึงมาจาก DB

	var appointment_struct models.Appointment                 //กำหนดตัวแปลที่จะเข้าถึงใน structure
	json.NewDecoder(request.Body).Decode(&appointment_struct) // รับข้อมูลจาก PM ลงมาใน structure

	_, err := appointment_collection.DeleteMany(ctx, bson.M{"appointment_id": appointment_struct.Appointment_id})

	if err != nil {
		fmt.Println(err)
	}
	json.NewEncoder(response).Encode("Delete") //แสดงใน PM
}
