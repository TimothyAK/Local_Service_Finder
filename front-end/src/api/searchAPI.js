import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/search/'

export const searchAPI = async (query, lat, lon, token) => {
        return axios.post(`${BASE_URL}/predict/`, 
            {
                query: query,
                lat: lat,
                lon: lon
            },
            {
                headers: {
                    "access-token": token
                }
            }
        )
    }
