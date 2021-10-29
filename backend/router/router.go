package router

import (
	"test/goscript"

	"github.com/gorilla/mux"
)

func Router() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/test", goscript.CreateTest).Methods("POST")
	router.HandleFunc("/gettest", goscript.GetTest).Methods("GET")
	router.HandleFunc("/delete", goscript.DeleteTest).Methods("DELETE")

	router.HandleFunc("/createdoc", goscript.CreateDoctor).Methods("POST")
	router.HandleFunc("/getdoc", goscript.GetDoctor).Methods("GET")
	router.HandleFunc("/createuser", goscript.CreateUser).Methods("POST")
	router.HandleFunc("/getuser", goscript.GetUser).Methods("GET")

	router.HandleFunc("/findtest", goscript.CallOnlyOneInOject).Methods("GET")
	router.HandleFunc("/createhistory", goscript.CreateHistory).Methods("POST")

	return router
}
