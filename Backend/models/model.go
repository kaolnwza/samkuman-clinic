package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Person struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name     string             `json:"name" bson:"name"`
	Lastname string             `json:"lastname" bson:"lastname"`
	Age      int                `json:"age" bson:"age"`
	Gu       []string           `json:"gu" bson:"gu"` //array
	//Gu map[string]string //object
}

// type Kuy struct {
// 	ID   primitive.ObjectID `json:"_id, omitempty" bson:"_id,omitempty"`
// 	Text string             `json:"text" bson:"text"`
// }

// type User struct {
// 	ID              primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
// 	Identity_number string             `json:"identity_number" bson:"identity_number"`
// 	Firstname       string             `json:"firstname" bson:"firstname"`
// 	Lastname        string             `json:"lastname" bson:"lastname"`
// 	Height          int                `json:"height" bson:"height"`
// 	Weight          float32            `json:"weight" bson:"weight"`
// }

// type Doctor struct {
// 	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
// 	Firstname string             `json:"firstname" bson:"firstname"`
// 	Lastname  string             `json:"lastname" bson:"lastname"`
// }

// type History struct {
// 	ID                primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
// 	Patient_Iden      string             `json:"patient_iden" bson:"patient_iden"`
// 	Patient_Firstname string             `json:"patient_firstname" bson:"patient_firstname"`
// 	Patient_Lastname  string             `json:"patient_lastname" bson:"patient_lastname"`
// 	Doctor_Firstname  string             `json:"doctor_firstname" bson:"doctor_firstname"`
// 	Doctor_Lastname   string             `json:"doctor_lastname" bson:"doctor_lastname"`
// 	Symptom           string             `json:"symptom" bson:"symptom"`
// 	Doctor_Advice     string             `json:"doctor_advice" bson:"doctor_advice"`
// }

type History_Create struct {
	//ID            primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Patient_Id    string `json:"patient_id" bson:"patient_id"`
	Doctor_Id     string `json:"doctor_id" bson:"doctor_id"`
	Symptom       string `json:"symptom" bson:"symptom"`
	Doctor_Advice string `json:"doctor_advice" bson:"doctor_advice"`
}

type Testza struct {
	Usef *User  `json:"hee" bson:"hee"`
	Name string `json:"name" bson:"name"`
}

type Register struct {
	ID              int    `json:"id" bson:"id"`
	Username        string `json:"username" bson:"username"`
	Password        string `json:"password" bson:"password"`
	Identity_number int    `json:"identity_number" bson:"identity_number"`
}

type Login struct {
	ID       int    `json:"id" bson:"id"`
	Username string `json:"username" bson:"username"`
	Password string `json:"password" bson:"password"`
}
