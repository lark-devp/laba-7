package main

import (
	"fmt"

	"net/http" // пакет для поддержки HTTP протокола
)

func handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	_, err := w.Write([]byte("Hello, " + r.URL.Query().Get("name") + "!"))
	if err != nil {
		panic(err)
	}

}
func main() {
	// здесь ваш код
	http.HandleFunc("/api/user", handler)
	fmt.Println("Сервер запущен на порту: 8083")
	err := http.ListenAndServe(":8083", nil)
	if err != nil {
		fmt.Println("Ошибка запуска сервера: ", err)
	}
}
