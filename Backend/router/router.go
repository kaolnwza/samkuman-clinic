package router

import (
	"go-mongo/services"

	"github.com/gorilla/mux"
)

func Router() *mux.Router {

	//kuyprayuth
	router := mux.NewRouter()
	router.HandleFunc("/test", services.CreateTest).Methods("POST")
	router.HandleFunc("/gettest", services.GetTest).Methods("GET")
	router.HandleFunc("/delete", services.DeleteTest).Methods("DELETE")

	router.HandleFunc("/createdoc", services.CreateDoctor).Methods("POST")
	router.HandleFunc("/getdoc", services.GetDoctor).Methods("GET")
	router.HandleFunc("/createuser", services.CreateUser).Methods("POST")
	router.HandleFunc("/getuser", services.GetUser).Methods("GET")

	router.HandleFunc("/findtest", services.CallOnlyOneInOject).Methods("GET")
	//router.HandleFunc("/createhistory", services.CreateHistory).Methods("POST")

	router.HandleFunc("/register", services.Register).Methods("POST")
	router.HandleFunc("/login", services.Login).Methods("POST")
	router.HandleFunc("/getcookie", services.GetCookie).Methods("GET")

	//queye
	router.HandleFunc("/addqueue", services.AddQueue).Methods("POST")
	router.HandleFunc("/usercanclequeue", services.UserCancelQueue).Methods("DELETE")
	router.HandleFunc("/reachqueue", services.ReachQueue).Methods("DELETE")
	router.HandleFunc("/getuserqueue", services.GetUserQueue).Methods("GET")

	//history
	router.HandleFunc("/addhistory", services.AddHistory).Methods("POST")
	router.HandleFunc("/gethistory", services.GetHistory).Methods("GET")

	return router
}
