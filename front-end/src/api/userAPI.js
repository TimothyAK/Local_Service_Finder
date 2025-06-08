import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/user'

export const loginAPI = async (email, password) => {
        return axios.post(`${BASE_URL}/login/`, 
            {
                email: email,
                password: password
            }
        )
    }

export const signUpAPI = async (username, email, password) => {
        return axios.post(`${BASE_URL}/signup/`, 
            {
                username: username,
                email: email,
                password: password
            }
        )
    }

export const requestResetAPI = async (email) => {
        return axios.post(`${BASE_URL}/request_reset/`, 
            {
                email: email
            }
        )
    }

export const resetPasswordAPI = async (email, password, newPassword) => {
        return axios.put(`${BASE_URL}/reset_password/`, 
            {
                email: email,
                password: password,
                newPassword: newPassword
            }
        )
    }
    
export const deleteAccountAPI = async (token) => {
        return axios.delete(`${BASE_URL}/delete_account/`, {
            headers: {
                "access-token": token
            }
        })
    }