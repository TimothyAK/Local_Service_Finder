package handlers

import (
	"bytes"
	"io"
	"net/http"
	"os"
)

// Proxy helper
func proxyRequest(w http.ResponseWriter, r *http.Request, endpoint string, method string) {
	backendURL := os.Getenv("BACKEND_BASE_URL") + endpoint

	// Read request body
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read request body", http.StatusBadRequest)
		return
	}

	// Create request to backend
	req, err := http.NewRequest(method, backendURL, bytes.NewBuffer(body))
	if err != nil {
		http.Error(w, "Failed to create backend request", http.StatusInternalServerError)
		return
	}

	req.Header.Set("Content-Type", "application/json")

	// Forward Authorization header if present
	if token := r.Header.Get("Authorization"); token != "" {
		req.Header.Set("Authorization", token)
	} else if token := r.Header.Get("access-token"); token != "" {
		req.Header.Set("Authorization", token)
	}

	// Send request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		http.Error(w, "Failed to contact backend", http.StatusBadGateway)
		return
	}
	defer resp.Body.Close()

	// Copy response
	w.WriteHeader(resp.StatusCode)
	io.Copy(w, resp.Body)
}

// === Public Routes ===
func SignUpHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	proxyRequest(w, r, "/api/users/signup/", "POST")
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	proxyRequest(w, r, "/api/users/login/", "POST")
}

func RequestResetHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	proxyRequest(w, r, "/api/users/request_reset/", "POST")
}

func ResetPasswordHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	proxyRequest(w, r, "/api/users/reset_password/", "PUT")
}

func DeleteAccountHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	proxyRequest(w, r, "/api/users/delete_account/", "DELETE")
}
