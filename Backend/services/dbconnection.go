package services

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client

func connectDB() {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	//client, _ = mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))
	client, _ = mongo.Connect(ctx, options.Client().ApplyURI("mongodb+srv://test:prayuth@samkumandb.gimth.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"))

}
