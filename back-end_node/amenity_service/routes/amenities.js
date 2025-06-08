const express = require("express");
const axios = require("axios")
const router = express.Router();
const { findNearbyServices } = require("../utils/maps");

router.get("/nearby", async (req, res) => {
  const { lat, lon, category } = req.query;

  if (!lat || !lon || !category) {
    return res.status(400).json({ error: "Missing required query parameters" });
  }
  const userAmenityServiceURL = process.env.USER_AMENITY_SERVICE_URL || "http://localhost:8002/api/user_amenities/";

  try {
    const results = await findNearbyServices({ lat: parseFloat(lat), lng: parseFloat(lon), category });
    const userAmenitiesResult = await axios.get(userAmenityServiceURL, {
        headers: {
            "access-token": req.headers["access-token"]
        }
    })
    const userAmenities = userAmenitiesResult["data"]["data"]

    formattedServices = []
    for(let amenity of results) {
        const userAmenity = userAmenities.find((ua) => {
            if(ua["amenityid"] == amenity["id"]) {
                return ua
            }
            return null
        })
        if (userAmenity != null) {
            formattedServices.push({
                "id": parseInt(amenity["id"]),
                "lat": amenity["lat"],
                "lon": amenity["lng"],
                "name": amenity["name"],
                "isVisitted": userAmenity["isVisitted"]
            })
            continue
        }
        formattedServices.push({
            "id": parseInt(amenity["id"]),
            "lat": amenity["lat"],
            "lon": amenity["lng"],
            "name": amenity["name"],
            "isVisitted": false
        })
    }

    return res.json({ data: formattedServices });
  } catch (err) {
    console.error("Nearby search error:", err.message);
    return res.status(500).json({ error: "Service fetch failed" });
  }
});

module.exports = router;
