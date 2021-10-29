package zalol

import (
	//"fmt"

	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"

	"context"

	"go.mongodb.org/mongo-driver/mongo/options"
	// "go.mongodb.org/mongo-driver/mongo/readpref"
)

// type MongoField struct {
// 	FieldStr string `json: "Field Str"`
// 	FieldInt int `json: "Field Int"`
// 	FieldBool bool `json: "Field Bool"`
// }

type User struct {
	Name     string
	Lastname string
	Age      int
	Gu       []string //array
	//Gu map[string]string //object
}

func main() {
	//connection db
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		log.Fatal(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}

	defer client.Disconnect(ctx)

	//set collection variable
	testDatabase := client.Database("test")
	zaCollection := testDatabase.Collection("za")

	/* find */
	// cursor, err := zaCollection.Find(ctx, bson.M{})
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// var zalol []bson.M
	// if err = cursor.All(ctx, &zalol); err != nil {
	// 	log.Fatal(err)
	// }

	// for _, item := range zalol {
	// 	fmt.Println(item["name"])
	// }

	/*filter */
	// opts := options.Find()
	// opts.SetSort(bson.D{{"age", -1}})
	// sortCursor, err := zaCollection.Find(ctx, bson.D{
	// 	{"age", bson.D{
	// 		{"$gt", 23},
	// 	}},
	// }, opts)
	// var zaSorted []bson.M
	// if err = sortCursor.All(ctx, &zaSorted); err != nil {
	// 	log.Fatal(err)
	// }
	// // for _, item := range zaSorted {
	// // 	fmt.Println(item["age"])
	// // }

	/* update one */
	// id, _ := primitive.ObjectIDFromHex("616734e4bca4f30c29e830a6")

	// result, err := zaCollection.UpdateOne(
	// 	ctx,
	// 	bson.M{"_id": id},
	// 	bson.D{
	// 		{"$set", bson.D{{"name", "prayuth"}}},
	// 	},
	// )
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// fmt.Println("Updateed", result.ModifiedCount)

	/* update many */
	// result, err := zaCollection.UpdateMany(
	// 	ctx,
	// 	bson.M{"lastname": "chan-o-cha"},
	// 	bson.D{
	// 		{"$set", bson.D{{"lastname", "chan-o-chaa"}}},
	// 	},
	// )
	// fmt.Println("updated", result.ModifiedCount)

	/*insert one */
	test_user := User{Name: "insert_name",
		Lastname: "insertlastname",
		Age:      50,
		Gu:       []string{"za", "lnw"}} // array
	//Gu:       map[string]string{"one":"za", "two":"lnw"} //object}

	data := bson.D{
		{"name", test_user.Name},
		{"lastname", test_user.Lastname},
		{"age", test_user.Age},
		{"gu", test_user.Gu},
	}
	insertResult, err := zaCollection.InsertOne(
		ctx,
		data,
	)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(insertResult.InsertedID)

	/*delete*/
	// asd := bson.M{"age": 34}
	// deleteResult, err := zaCollection.DeleteOne(ctx, asd) //must in oneline dont know reason
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// fmt.Println(deleteResult)

}
