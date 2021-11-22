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

func DoctorLogin(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")

	var data_get models.User
	//data_get.Email = "404"
	json.NewDecoder(request.Body).Decode(&data_get)
	// fmt.Println(data_get.Identity_number)
	// fmt.Println(data_get.Password)
	collection := client.Database(database).Collection("user")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	var data models.User
	_ = collection.FindOne(ctx, bson.M{"email": data_get.Email}).Decode(&data)

	if data.Email == "" {
		// fmt.Println(data.Identity_number)
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

	response.Header().Set("Access-Control-Allow-Origin", GetLocalIp())

	json.NewEncoder(response).Encode("Login success")
}

var doctorCookieId = -1

func DoctorGetCookie(response http.ResponseWriter, request *http.Request) {
	tokenCookie, _ := request.Cookie("jwt")
	token, _ := jwt.ParseWithClaims(tokenCookie.Value, &jwt.StandardClaims{},
		func(t *jwt.Token) (interface{}, error) {
			return []byte(SecretKey), nil
		})

	claims := token.Claims.(*jwt.StandardClaims)

	doctorCookieId, _ = strconv.Atoi(claims.Issuer)
	fmt.Println("Get cookie success(doctor): ", doctorCookieId)
	fmt.Println("doctorCookieId(doctor): ", doctorCookieId)

	json.NewEncoder(response).Encode("Get cookie success")

}

func DoctorLogout(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")

	http.SetCookie(response,
		&http.Cookie{
			Name:     "jwt",
			Value:    "",
			Expires:  time.Now().Add(-time.Hour),
			HttpOnly: true,
		})
	userCookieId = -1
	json.NewEncoder(response).Encode("Logout success")
}
