import axios from "axios";

const BASE_URL = 'https://griffon-prompt-manually.ngrok-free.app'

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
