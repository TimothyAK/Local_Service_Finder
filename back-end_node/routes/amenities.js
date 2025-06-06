const express = require("express");
const router = express.Router();
const { findNearbyServices } = require("../maps"); // or correct path

// POST /api/amenities/search
router.post("/search", async (req, res) => {
  const { lat, lng, category } = req.body;

  if (!lat || !lng || !category) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const results = await findNearbyServices({ lat, lng }, category);
    return res.json({ data: results });
  } catch (err) {
    return res.status(500).json({ error: "Service fetch failed" });
  }
});

module.exports = router;
