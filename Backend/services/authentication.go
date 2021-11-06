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

	collection := client.Database("test").Collection("auth")
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

	collection := client.Database("test").Collection("auth")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	var data models.Login
	_ = collection.FindOne(ctx, bson.M{"username": data_get.Username}).Decode(&data)

	if data.Username == "" {
		json.NewEncoder(response).Encode("Username not found")
		return
	}
	//result := "Right"

	if err := bcrypt.CompareHashAndPassword([]byte(data.Password), []byte(data_get.Password)); err != nil {

		json.NewEncoder(response).Encode("Incorrect Password")
		return

	}

	expir := time.Now().Add(time.Hour * 1)

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    strconv.Itoa(int(data.ID)),
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

	json.NewEncoder(response).Encode(token)
}

func GetCookie(response http.ResponseWriter, request *http.Request) {
	tokenCookie, _ := request.Cookie("jwt")
	token, _ := jwt.ParseWithClaims(tokenCookie.Value, &jwt.StandardClaims{},
		func(t *jwt.Token) (interface{}, error) {
			return []byte(SecretKey), nil
		})

	claims := token.Claims.(*jwt.StandardClaims)

	collection := client.Database("test").Collection("user")

	json.NewEncoder(response).Encode(claims)
}
