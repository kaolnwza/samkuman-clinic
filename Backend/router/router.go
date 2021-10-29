package router

import (
	"go-mongo/services"

	"github.com/gorilla/mux"
)

func Router() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/test", services.CreateTest).Methods("POST")
	router.HandleFunc("/gettest", services.GetTest).Methods("GET")
	router.HandleFunc("/delete", services.DeleteTest).Methods("DELETE")

	router.HandleFunc("/createdoc", services.CreateDoctor).Methods("POST")
	router.HandleFunc("/getdoc", services.GetDoctor).Methods("GET")
	router.HandleFunc("/createuser", services.CreateUser).Methods("POST")
	router.HandleFunc("/getuser", services.GetUser).Methods("GET")

	router.HandleFunc("/findtest", services.CallOnlyOneInOject).Methods("GET")
	router.HandleFunc("/createhistory", services.CreateHistory).Methods("POST")

	return router
}
