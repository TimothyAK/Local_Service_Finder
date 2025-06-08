package handlers

import (
	"bytes"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"
)

// logs color
const (
	green  = "\033[32m"
	red    = "\033[31m"
	blue   = "\033[34m"
	yellow = "\033[33m"
	reset  = "\033[0m"
)

func proxyRequest(w http.ResponseWriter, r *http.Request, targetURL string) {
	log.Printf("%s[MIDDLEWARE] → %s %s => %s%s", blue, r.Method, r.URL.Path, targetURL, reset)

	// read and clone body
	var bodyBytes []byte
	if r.Body != nil {
		var err error
		bodyBytes, err = ioutil.ReadAll(r.Body)
		if err != nil {
			log.Printf("%s[MIDDLEWARE ERROR] Failed to read request body: %v%s", red, err, reset)
			http.Error(w, "Failed to read request body", http.StatusBadRequest)
			return
		}
	}

	r.Body = io.NopCloser(bytes.NewBuffer(bodyBytes))

	// create a new request with the same method and headers
	req, err := http.NewRequest(r.Method, targetURL, bytes.NewReader(bodyBytes))
	if err != nil {
		log.Printf("%s[MIDDLEWARE ERROR] Failed to create request: %v%s", red, err, reset)
		http.Error(w, "Failed to create request", http.StatusInternalServerError)
		return
	}
	req.Header = r.Header.Clone()

	// forward to backend
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Printf("%s[MIDDLEWARE ERROR] Request to backend failed: %v%s", red, err, reset)
		http.Error(w, "Request to backend failed", http.StatusBadGateway)
		return
	}
	defer resp.Body.Close()

	// Copy headers and response body
	for k, v := range resp.Header {
		w.Header()[k] = v
	}
	w.WriteHeader(resp.StatusCode)
	io.Copy(w, resp.Body)

	log.Printf("%s[MIDDLEWARE] ← Response %d from %s%s", green, resp.StatusCode, targetURL, reset)
}

var (
	userServiceURL        = getEnv("USER_SERVICE_URL", "http://localhost:8000")
	amenityServiceURL     = getEnv("AMENITY_SERVICE_URL", "http://localhost:8001")
	userAmenityServiceURL = getEnv("USER_AMENITY_SERVICE_URL", "http://localhost:8002")
)

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}

// Route handlers
func UserHandler(w http.ResponseWriter, r *http.Request) {
	path := strings.Replace(r.URL.RequestURI(), "/api/user/", "/api/users/", 1)
	target := userServiceURL + path
	proxyRequest(w, r, target)
}

func AmenityHandler(w http.ResponseWriter, r *http.Request) {
	path := strings.Replace(r.URL.RequestURI(), "/api/amenity/", "/api/amenities/", 1)
	target := amenityServiceURL + path
	proxyRequest(w, r, target)
}

func UserAmenityHandler(w http.ResponseWriter, r *http.Request) {
	path := strings.Replace(r.URL.RequestURI(), "/api/user-amenity/", "/api/user_amenities/", 1)
	target := userAmenityServiceURL + path
	proxyRequest(w, r, target)
}

func SearchHandler(w http.ResponseWriter, r *http.Request) {
	target := "https://griffon-prompt-manually.ngrok-free.app" + r.URL.Path
	proxyRequest(w, r, target)
}
