package main

import (
	"fmt"
	"net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write([]byte("Hello, web!"))
}
func main() {
	// здесь ваш код
	http.HandleFunc("/get", helloHandler)

	err := http.ListenAndServe(":8082", nil)
	fmt.Println("Сервер запущен на порту: 8082")
	if err != nil {
		fmt.Println("Ошибка запуска сервера", err)
	}
}
