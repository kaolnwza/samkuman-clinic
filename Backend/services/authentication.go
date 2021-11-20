package services

import (
	"context"
	"encoding/json"
	"fmt"
	"go-mongo/models"
	"net/http"
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

func init() {
	connectDB()
}

const SecretKey = "hehee"

func Register(response http.ResponseWriter, request *http.Request) {

	response.Header().Add("content-type", "application/json")
	var data models.Register

	json.NewDecoder(request.Body).Decode(&data)

	collection := client.Database(database).Collection("auth")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	password_token, _ := bcrypt.GenerateFromPassword([]byte(data.Password), 7)

	new_data := models.Register{
		Username: data.Username,
		Password: string(password_token),
		ID:       data.ID,
	}
	fmt.Println(new_data)

	result, _ := collection.InsertOne(ctx, new_data)
	_ = result
	json.NewEncoder(response).Encode(new_data)
}

func Login(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")

	var data_get models.Login
	json.NewDecoder(request.Body).Decode(&data_get)
	fmt.Println(data_get.Identity_number)
	fmt.Println(data_get.Password)
	collection := client.Database(database).Collection("user")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	var data models.User
	_ = collection.FindOne(ctx, bson.M{"identity_number": data_get.Identity_number}).Decode(&data)

	if data.Identity_number == "" {
		fmt.Println(data.Identity_number)
		fmt.Println("User not found")
		json.NewEncoder(response).Encode("User not found")

		return
	}
	//result := "Right"

	if err := bcrypt.CompareHashAndPassword([]byte(data.Password), []byte(data_get.Password)); err != nil {
		// fmt.Println(data.Password)
		// fmt.Println(data_get.Password)
		fmt.Println("Incorrect Password")
		json.NewEncoder(response).Encode("Incorrect Password")
		return

	}

	expir := time.Now().Add(time.Hour * 1)

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    strconv.Itoa(int(data.User_id)),
		ExpiresAt: expir.Unix(),
	})

	token, err := claims.SignedString([]byte(SecretKey))
	if err != nil {
		json.NewEncoder(response).Encode("Can't Login")
	}

	http.SetCookie(response,
		&http.Cookie{
			Name:     "jwt",
			Value:    token,
			Expires:  expir,
			HttpOnly: true,
		})
	fmt.Println("Login success token: ", token)

	response.Header().Set("Access-Control-Allow-Origin", "http://http://192.168.1.4:19000")

	json.NewEncoder(response).Encode("Login success")
}

var userCookieId = -1

func GetCookie(response http.ResponseWriter, request *http.Request) {
	tokenCookie, _ := request.Cookie("jwt")
	token, _ := jwt.ParseWithClaims(tokenCookie.Value, &jwt.StandardClaims{},
		func(t *jwt.Token) (interface{}, error) {
			return []byte(SecretKey), nil
		})

	claims := token.Claims.(*jwt.StandardClaims)

	//collection := client.Database(database).Collection("user")
	///fmt.Println(claims.Issuer)
	//userCookieId = claims.Issuer
	userCookieId, _ = strconv.Atoi(claims.Issuer)
	fmt.Println("Get cookie success: ", userCookieId)
	fmt.Println("userCookieId: ", userCookieId)
	//fmt.Println(userCookieId)

	json.NewEncoder(response).Encode("Get cookie success")

}

func Logout(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")

	http.SetCookie(response,
		&http.Cookie{
			Name:     "jwt",
			Value:    "",
			Expires:  time.Now().Add(-time.Hour),
			HttpOnly: true,
		})

	json.NewEncoder(response).Encode("Logout success")
}

func FindUser(response http.ResponseWriter, request *http.Request) {
	//test
	response.Header().Add("content-type", "application/json")

	collection := client.Database(database).Collection("user")
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)

	//objectId, _ := primitive.ObjectIDFromHex("6171174184330dedf05e86a2")
	//fmt.Println(objectId)
	var get_data models.User
	find_object := bson.M{"user_id": userCookieId}
	err := collection.FindOne(ctx, find_object).Decode((&get_data))

	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}

	json.NewEncoder(response).Encode(get_data)

}

func SignUp(response http.ResponseWriter, request *http.Request) {

	fmt.Println("Create Function")
	response.Header().Add("content-type", "application/json")
	//find range of user_id

	user_collection := client.Database(database).Collection("user")
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)

	cursor, err := user_collection.Find(ctx, bson.M{})
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}
	count := 0
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {

		count++
	}
	// end of finding user range
	fmt.Println(count)
	var user models.User

	json.NewDecoder(request.Body).Decode(&user)
	user.User_id = count
	user.Password = EncodePassword(user.Password)
	collection := client.Database(database).Collection("user")
	result, _ := collection.InsertOne(ctx, user)
	_ = result
	json.NewEncoder(response).Encode(user)

}

func EncodePassword(income_password string) string {
	password_token, _ := bcrypt.GenerateFromPassword([]byte(income_password), 7)
	return string(password_token)
}

func GetUserInformation(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	history_collection := client.Database(database).Collection("history")
	user_collection := client.Database(database).Collection("user")

	var get_data models.UserInformation
	json.NewDecoder(request.Body).Decode(&get_data)
	//var information_struct models.UserInformation
	var user_struct models.User
	var history_struct []models.History
	//find user history

	cursor, err := history_collection.Find(ctx, bson.M{"user.user_id": userCookieId})
	if err != nil {
		fmt.Println(err)
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var temp models.History
		cursor.Decode(&temp)
		history_struct = append(history_struct, temp)
	}

	user_collection.FindOne(ctx, bson.M{"user_id": get_data.User.User_id}).Decode(&user_struct)

	fmt.Println("Profile")
	message := bson.M{
		"user_object":    user_struct,
		"history_object": history_struct,
	}

	json.NewEncoder(response).Encode(message)
	//json.NewEncoder(response).Encode(history_struct)

}
