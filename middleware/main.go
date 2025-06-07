package main

import (
	"localservicefinder/handlers"
	"log"
	"net/http"
)

const (
	yellow = "\033[33m"
	cyan   = "\033[36m"
	reset  = "\033[0m"
)

func main() {
	mux := http.NewServeMux()

	// API routes
	mux.HandleFunc("/api/user/", handlers.UserHandler)
	mux.HandleFunc("/api/amenity/", handlers.AmenityHandler)
	mux.HandleFunc("/api/user-amenity/", handlers.UserAmenityHandler)
	mux.HandleFunc("/api/search/", handlers.SearchHandler)

	// logging
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s[MIDDLEWARE] Unhandled route: %s %s%s", yellow, r.Method, r.URL.Path, reset)
		http.NotFound(w, r)
	})

	log.Printf("%s[MIDDLEWARE] Running on http://localhost:8080...%s", cyan, reset)
	log.Fatal(http.ListenAndServe(":8080", corsMiddleware(mux)))
}

// corsMiddleware
func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

		// Handle OPTIONS preflight
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Forward to next handler
		next.ServeHTTP(w, r)
	})
}
