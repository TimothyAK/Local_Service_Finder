const express = require("express");
const router = express.Router();
const { findNearbyServices } = require("../utils/maps");

router.get("/nearby", async (req, res) => {
  const { lat, lon, category } = req.query;

  if (!lat || !lon || !category) {
    return res.status(400).json({ error: "Missing required query parameters" });
  }

  try {
    const results = await findNearbyServices({ lat: parseFloat(lat), lng: parseFloat(lon), category });
    return res.json({ data: results });
  } catch (err) {
    console.error("Nearby search error:", err.message);
    return res.status(500).json({ error: "Service fetch failed" });
  }
});

module.exports = router;
