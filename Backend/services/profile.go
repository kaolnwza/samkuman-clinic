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

func EditProfile(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	user_collection := client.Database(database).Collection("user") //ดึงมาจาก DB

	var user_struct models.User                        //กำหนดตัวแปลที่จะเข้าถึงใน structure
	json.NewDecoder(request.Body).Decode(&user_struct) // รับข้อมูลจาก PM ลงมาใน user structure

	// Edit FirstName
	if user_struct.Firstname != "" {
		_, err := user_collection.UpdateOne(
			ctx,
			bson.M{"user_id": user_struct.User_id},
			bson.D{
				{"$set", bson.D{{"firstname", user_struct.Firstname}}},
			},
		)
		if err != nil {
			fmt.Println(err)
		}
		json.NewEncoder(response).Encode("Firstname") //แสดงใน PM
	}

	// // Edit LastName
	if user_struct.Lastname != "" {
		_, err := user_collection.UpdateOne(
			ctx,
			bson.M{"user_id": user_struct.User_id},
			bson.D{
				{"$set", bson.D{{"lastname", user_struct.Lastname}}},
			},
		)
		if err != nil {
			fmt.Println(err)
		}
		json.NewEncoder(response).Encode("lastname") //แสดงใน PM
	}

	// Edit BirthDay
<<<<<<< HEAD
=======

>>>>>>> kao2
	_, err := user_collection.UpdateOne(
		ctx,
		bson.M{"user_id": user_struct.User_id},
		bson.D{
			{"$set", bson.D{{"dob", user_struct.Dob}}},
		},
	)
	if err != nil {
		fmt.Println(err)
	}
	json.NewEncoder(response).Encode("birthday") //แสดงใน PM

	// Edit Gender
	if user_struct.Gender != "" {
		_, err := user_collection.UpdateOne(
			ctx,
			bson.M{"user_id": user_struct.User_id},

			bson.D{
				{"$set", bson.D{{"gender", user_struct.Gender}}},
			},
		)
		if err != nil {
			fmt.Println(err)
		}
		json.NewEncoder(response).Encode("Gender") //แสดงใน PM
	}

	// Edit address
	if user_struct.Address != "" {
		_, err := user_collection.UpdateOne(
			ctx,
			bson.M{"user_id": user_struct.User_id},

			bson.D{
				{"$set", bson.D{{"address", user_struct.Address}}},
			},
		)
		if err != nil {
			fmt.Println(err)
		}
		json.NewEncoder(response).Encode("Address") //แสดงใน PM
	}

	// Edit TEL
	if user_struct.Phone_number != "" {
		_, err := user_collection.UpdateOne(
			ctx,
			bson.M{"user_id": user_struct.User_id},

			bson.D{
				{"$set", bson.D{{"phone_number", user_struct.Phone_number}}},
			},
		)
		if err != nil {
			fmt.Println(err)
		}
		json.NewEncoder(response).Encode("Phone_number") //แสดงใน PM
	}

	// Edit height
	if user_struct.Height > 0 {
		_, err := user_collection.UpdateOne(
			ctx,
			bson.M{"user_id": user_struct.User_id},
			bson.D{
				{"$set", bson.D{{"height", user_struct.Height}}},
			},
		)
		if err != nil {
			fmt.Println(err)
		}
		json.NewEncoder(response).Encode("Height") //แสดงใน PM
	}

	// Edit weight
	if user_struct.Weight > 0 {
		_, err := user_collection.UpdateOne(
			ctx,
			bson.M{"user_id": user_struct.User_id},
			bson.D{
				{"$set", bson.D{{"weight", user_struct.Weight}}},
			},
		)
		if err != nil {
			fmt.Println(err)
		}
		json.NewEncoder(response).Encode("Weight") //แสดงใน PM
	}

	// Edit Allergic
	if user_struct.Allergic != "" {
		_, err := user_collection.UpdateOne(
			ctx,
			bson.M{"user_id": user_struct.User_id},
			bson.D{
				{"$set", bson.D{{"allergic", user_struct.Allergic}}},
			},
		)
		if err != nil {
			fmt.Println(err)
		}
		json.NewEncoder(response).Encode("Allergic") //แสดงใน PM
	}

	// Edit Disease
	if user_struct.Disease != "" {
		_, err := user_collection.UpdateOne(
			ctx,
			bson.M{"user_id": user_struct.User_id},
			bson.D{
				{"$set", bson.D{{"disease", user_struct.Disease}}},
			},
		)
		if err != nil {
			fmt.Println(err)
		}
		json.NewEncoder(response).Encode("Disease") //แสดงใน PM
	}

	// Edit Disease
	if user_struct.Email != "" {
		_, err := user_collection.UpdateOne(
			ctx,
			bson.M{"user_id": user_struct.User_id},
			bson.D{
				{"$set", bson.D{{"email", user_struct.Email}}},
			},
		)
		if err != nil {
			fmt.Println(err)
		}
		json.NewEncoder(response).Encode("Email") //แสดงใน PM
	}

	// Edit Password
	if user_struct.Password != "" {
		_, err := user_collection.UpdateOne(
			ctx,
			bson.M{"user_id": user_struct.User_id},
			bson.D{
				{"$set", bson.D{{"password", EncodePassword(user_struct.Password)}}},
			},
		)
		if err != nil {
			fmt.Println(err)
		}
		json.NewEncoder(response).Encode("Password") //แสดงใน PM
	}

}
