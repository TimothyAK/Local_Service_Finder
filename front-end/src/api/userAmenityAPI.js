import axios from "axios";

const BASE_URL = 'http://localhost:8002/api/user_amenities/'

export const bulkUpdateAPI = async (updatedData, token) => {
    return axios.post(`${BASE_URL}`, {
        list: updatedData
    },{
        headers: {
            "access-token": token
        }
    }
    )
}

export const getUserAmenityHistory = async (token) => {
    return axios.get(`${BASE_URL}`, {
        headers: {
            "access-token": token
        }
    })
}