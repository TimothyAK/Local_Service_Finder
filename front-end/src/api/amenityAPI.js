import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/amenity/'

export const nearbySearchAPI = async (category, lat, lon, token) => {
    const timestamp = Date.now()
    return axios.get(`${BASE_URL}/nearby?lat=${lat}&lon=${lon}&category=${category}&_=${timestamp}`, {
            headers: {
                "access-token": token
            }
        }
    )
}
