package services

import (
	"context"
	"encoding/json"
	"go-mongo/models"
	"net/http"
	"time"
	"fmt"

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
	count := 0
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		count++
	}
	appointment_structure.Appointment_id = count
	appointment_structure.Date = time.Now() 



	appointment_collection.InsertOne(ctx, appointment_structure) // inset ข้อมูลลง DB
	json.NewEncoder(response).Encode(appointment_structure) //แสดงใน PM
}

func GetAppointment(response http.ResponseWriter, request *http.Request)  {
	response.Header().Add("content-type", "application/json")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	appointment_collection := client.Database(database).Collection("appointment") //ดึงมาจาก DB

	var get_data models.Appointment
	json.NewDecoder(request.Body).Decode(&get_data)
	var appointment_struct []models.Appointment

	//Find user appointment
	cursor, err := appointment_collection.Find(ctx, bson.M{"user_id": get_data.User_id})
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
