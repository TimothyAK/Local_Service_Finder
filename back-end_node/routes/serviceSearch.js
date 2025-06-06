const express = require("express");
const router = express.Router();
const { getLatLng, findNearbyServices } = require("../maps");

router.post("/search", async (req, res) => {
  const { location, category } = req.body;

  if (!location || !category) {
    return res.status(400).json({ error: "Location and category required" });
  }

  try {
    const coords = await getLatLng(location);
    const results = await findNearbyServices(coords, category);
    res.json({ results });
  } catch (err) {
    console.error("Error during service search:", err.message);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});

module.exports = router;
