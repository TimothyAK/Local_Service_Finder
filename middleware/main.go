package main

import (
	"log"
	"net/http"
	"os"

	"local_service_finder/middleware/handlers"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8081"
	}

	mux := http.NewServeMux()

	// Health check
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Middleware is up and running"))
	})

	// Public routes
	mux.HandleFunc("/api/users/signup", handlers.SignUpHandler)
	mux.HandleFunc("/api/users/login", handlers.LoginHandler)
	mux.HandleFunc("/api/users/request_reset", handlers.RequestResetHandler)
	mux.HandleFunc("/api/users/reset_password", handlers.ResetPasswordHandler)
	//mux.Handle("/api/users/delete_account", handlers.DeleteAccountHandler)

	log.Printf("Middleware listening on port %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, mux))
}
