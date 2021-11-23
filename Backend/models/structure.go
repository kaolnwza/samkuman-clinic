package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID              primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	User_id         int                `json:"user_id" bson:"user_id"`
	Identity_number string             `json:"identity_number" bson:"identity_number"`
	Firstname       string             `json:"firstname" bson:"firstname"`
	Lastname        string             `json:"lastname" bson:"lastname"`
	Gender          string             `json:"gender" bson:"gender"`
	Height          int                `json:"height" bson:"height"`
	Weight          float32            `json:"weight" bson:"weight"`
	Dob             time.Time          `json:"dob" bson:"dob"`
	Address         string             `json:"address" bson:"address"`
	Phone_number    string             `json:"phone_number" bson:"phone_number"`
	Allergic        string             `json:"allergic" bson:"allergic"`
	Disease         string             `json:"disease" bson:"disease"`
	Email           string             `json:"email" bson:"email"`
	Password        string             `json:"password" bson:"password"`
	Age             int                `json:"age" bson:"age"`
}

type Doctor struct {
	Doctor_id           int    `json:"doctor_id" bson:"doctor_id"`
	Doctor_Firstname    string `json:"doctor_firstname" bson:"doctor_firstname"`
	Doctor_Lastname     string `json:"doctor_lastname" bson:"doctor_lastname"`
	Doctor_Gender       string `json:"doctor_gender" bson:"doctor_gender"`
	Doctor_Phone_number string `json:"doctor_phone_number" bson:"doctor_phone_number"`
	Doctor_Password     string `json:"doctor_password" bson:"doctor_password"`
	Doctor_Email        string `json:"doctor_email" bson:"doctor_email"`
}

type Department struct {
	Department_id   int    `json:"department_id" bson:"department_id"`
	Department_name string `json:"department_name" bson:"department_name"`
}

type Doctor_schedule struct {
	Schedule_id int    `json:"schedule_id" bson:"schedule_id"`
	Date        string `json:"date" bson:"date"`
	Time_start  string `json:"time_start" bson:"time_start"`
	Time_end    string `json:"time_end" bson:"time_end"`
}

type Appointment struct {
	Appointment_id   int       `json:"appointment_id" bson:"appointment_id"`
	History_id       int       `json:"history_id" bson:"history_id"`
	User_id          int       `json:"user_id" bson:"user_id"`
	Firstname        string    `json:"firstname" bson:"firstname"`
	Lastname         string    `json:"lastname" bson:"lastname"`
	Doctor_id        int       `json:"doctor_id" bson:"doctor_id"`
	Doctor_Firstname string    `json:"doctor_firstname" bson:"doctor_firstname"`
	Doctor_Lastname  string    `json:"doctor_lastname" bson:"doctor_lastname"`
	Date             time.Time `json:"date" bson:"date"`
	Status           bool      `json:"status" bson:"status"`
}

type History struct {
	ID         primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	History_id int                `json:"history_id " bson:"history_id "`
	User_id    int                `json:"user_id" bson:"user_id"`
	Doctor
	Date          time.Time `json:"date" bson:"date"`
	Symptom       string    `json:"symptom" bson:"symptom"`
	Diagnose      string    `json:"diagnose" bson:"diagnose"`
	Doctor_advice string    `json:"doctor_advice" bson:"doctor_advice"`
	Medicine      string    `json:"medicine" bson:"medicine"`
}

type Informaion struct {
	Info_id int    `json:"info_id " bson:"info_id "`
	Title   string `json:"title" bson:"title"`
	Detail  string `json:"detail" bson:"detail"`
}

type Public_relation struct {
	Info_id int    `json:"info_id " bson:"info_id "`
	Title   string `json:"title" bson:"title"`
	Detail  string `json:"detail" bson:"detail"`
}

type Notification struct {
	ID              primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Notification_id int                `json:"notification_id" bson:"notification_id "`
	Title           string             `json:"title" bson:"title"`
	Content         string             `json:"content" bson:"content"`
}

type Announce struct {
	ID          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Announce_id int                `json:"announce_id" bson:"announce_id "`
	Title       string             `json:"title" bson:"title"`
	Content     string             `json:"content" bson:"content"`
	Category    string             `json:"category" bson:"category"`
	Status      bool               `json:"status" bson:"status"`
}

type Queue struct {
	ID           primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Queue_id     int                `json:"queue_id" bson:"queue_id"`
	User_id      int                `json:"user_id" bson:"user_id"`
	Queue_remain int                `json:"queue_remain" bson:"queue_remain"`
	Type         string             `json:"type" bson:"type"`
	Status       bool               `json:"status" bson:"status"`
	Symtom       string             `json:"symtom" bson:"symtom"`
}

type UserInformation struct {
	User
	History
}

type PasswordManage struct {
	User_id      int    `json:"user_id" bson:"user_id"`
	Old_Password string `json:"old_password" bson:"old_password"`
	New_Password string `json:"new_password" bson:"new_password"`
}
