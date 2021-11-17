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

func GetPublic(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	public_collection := client.Database(database).Collection("public_relation")

	var public_struct []models.Public_relation
	//find user history

	cursor, err := public_collection.Find(ctx, bson.M{})
	if err != nil {
		fmt.Println(err)
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var temp models.Public_relation
		cursor.Decode(&temp)
		public_struct = append(public_struct, temp)
	}
	fmt.Println("Public Relation")
	json.NewEncoder(response).Encode(public_struct)
}
