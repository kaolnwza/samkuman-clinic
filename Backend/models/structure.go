package models
import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID              primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Identity_number string             `json:"identity_number" bson:"identity_number"`
	Firstname       string             `json:"firstname" bson:"firstname"`
	Lastname        string             `json:"lastname" bson:"lastname"`
	Gender	  		bool			   `json:"gender" bson:"gender"`
	Height          int                `json:"height" bson:"height"`
	Weight          float32            `json:"weight" bson:"weight"`
	Dob          	string             `json:"dob" bson:"dob"`
	Age				int 			   `json:"age" bson:"age"`
	Address			string			   `json:"address" bson:"address"`
	Phone_number  	string             `json:"phone_number" bson:"phone_number"`
	Allergic		string		       `json:"allergic" bson:"allergic"`
	Disease			string			   `json:"disease" bson:"disease"`
	Email			string			   `json:"email" bson:"email"`
	Password		string			   `json:"password" bson:"password"`
}

type Doctor struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Doctor_id		int				 `json:"doctor_id" bson:"doctor_id"`
	Firstname 		string             `json:"firstname" bson:"firstname"`
	Lastname  		string             `json:"lastname" bson:"lastname"`
	Gender	  		bool				 `json:"gender" bson:"gender"` 	
	Phone_number  	string             `json:"phone_number" bson:"phone_number"`
}


type Department struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Department_id		int				 `json:"department_id" bson:"department_id"`
	Department_name 	string           `json:"department_name" bson:"department_name"`
}


type Doctor_schedule struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Schedule_id		int				 `json:"schedule_id" bson:"schedule_id"`
	Date 			string           `json:"date" bson:"date"`
	Time_start 		string           `json:"time_start" bson:"time_start"`
	Time_end 		string           `json:"time_end" bson:"time_end"`
}

type Appointment struct {
	ID                primitive.ObjectID 	`json:"_id,omitempty" bson:"_id,omitempty"`
	Appointment_id      int                		`json:"appointment_id " bson:"appointment_id "`
	Date 				string             		`json:"date" bson:"date"`
	Time  				string             		`json:"time" bson:"time"`
}

type History struct {
	ID                primitive.ObjectID 	`json:"_id,omitempty" bson:"_id,omitempty"`
	History_id      int                		`json:"history_id " bson:"history_id "`
	Date 			string             		`json:"date" bson:"date"`
	Symptom  		string             		`json:"symptom" bson:"symptom"`
	Diagnose  		string             		`json:"diagnose" bson:"diagnose"`
	Doctor_advice   string             		`json:"doctor_advice" bson:"doctor_advice"`
	Medicine  		string             		`json:"medicine" bson:"medicine"`
	Usage  			string					`json:"usage" bson:"usage"`
}


type Notification struct {
	ID                primitive.ObjectID 	`json:"_id,omitempty" bson:"_id,omitempty"`
	Notification_id     int                		`json:"notification_id" bson:"notification_id "`
	Title 				string             		`json:"title" bson:"title"`
	Content  			string             		`json:"content" bson:"content"`
}

type Announce struct {
	ID                primitive.ObjectID 	`json:"_id,omitempty" bson:"_id,omitempty"`
	Announce_id     int                	`json:"announce_id" bson:"announce_id "`
	Title 			string             		`json:"title" bson:"title"`
	Content  		string             		`json:"content" bson:"content"`
	Category  		string             		`json:"category" bson:"category"`
	Status  		bool             		`json:"status" bson:"status"`
}

type Queue struct {
	ID                primitive.ObjectID 	`json:"_id,omitempty" bson:"_id,omitempty"`
	Queue_id      		int                	`json:"queue_id" bson:"queue_id "`
	Queue_number 		string             	`json:"queue_number" bson:"queue_number"`
	Status  			bool             	`json:"status" bson:"status"`
}
