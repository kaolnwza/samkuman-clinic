package goscript

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client

func connectDB() {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	client, _ = mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))
	//client, _ = mongo.Connect(ctx, options.Client().ApplyURI("mongodb+srv://test:prayuth@samkumandb.gimth.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"))

	//defer client.Disconnect()

	//client, err := mongo.NewClient(options.Client().ApplyURI("mongodb+srv://test:prayuth@samkumandb.gimth.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"))
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	// err = client.Connect(ctx)
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// defer client.Disconnect(ctx)
	// err = client.Ping(ctx, readpref.Primary())
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// datb, err := client.ListDatabaseNames(ctx, bson.M{})
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// fmt.Println(datb)
}
