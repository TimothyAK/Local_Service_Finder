const axios = require("axios");

// Geocode address into lat/lng using Nominatim (OpenStreetMap)
async function getLatLng(address) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;

  try {
    const res = await axios.get(url, {
      headers: { 'User-Agent': 'LocalServiceFinder/1.0' }
    });
    if (res.data && res.data.length > 0) {
      return {
        lat: parseFloat(res.data[0].lat),
        lng: parseFloat(res.data[0].lon)
      };
    }

    console.error("Geocoding API error: No results found.");
    throw new Error("Could not find location");
  } catch (err) {
    console.error("Error in getLatLng:", err.message);
    throw err;
  }
}

// Category definitions
const categoryMap = {
  fnb: ["restaurant", "cafe", "fast_food"],
  finance: ["bank", "atm"],
  shopping: ["mall", "clothes", "supermarket", "convenience", "department_store"],
  healthcare: ["hospital", "clinic", "pharmacy"],
  entertainment: ["cinema", "theatre", "arts_centre", "amusement_arcade"]
};

// Classify type
function classifyType(type) {
  for (const [category, types] of Object.entries(categoryMap)) {
    if (types.includes(type)) {
      return category;
    }
  }
  return "other";
}

// ✅ FIXED: Overpass-based service finder
async function findNearbyServices({ lat, lng }, category) {
  const filters = categoryMap[category.toLowerCase()];
  if (!filters) {
    console.error("Invalid category:", category);
    throw new Error("Invalid service category");
  }

  const overpassQuery = `
    [out:json][timeout:25];
    (
      ${filters.map(
        type => `node["amenity"="${type}"](around:10000,${lat},${lng});`
      ).join("\n")}
    );
    out body;
  `;

  console.log("🔍 Overpass Query:\n", overpassQuery);

  try {
    const res = await axios.post(
      "https://overpass-api.de/api/interpreter",
      `data=${encodeURIComponent(overpassQuery)}`,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    if (res.data?.elements?.length > 0) {
      return res.data.elements.map(place => ({
        id: place.id,
        name: place.tags?.name || "N/A",
        lat: place.lat,
        lng: place.lon,
        type: place.tags?.amenity || place.tags?.shop || "unknown",
        category: classifyType(place.tags?.amenity || place.tags?.shop),
        address: `${place.tags?.["addr:street"] || ""} ${place.tags?.["addr:housenumber"] || ""}`.trim(),
        rating: place.tags?.rating || "N/A"
      }));
    } else {
      console.warn("⚠ No results from Overpass.");
      throw new Error("No services found");
    }
  } catch (err) {
    console.error("Overpass API error:", err.response?.data || err.message);
    throw new Error("Service fetch failed");
  }
}

module.exports = { getLatLng, findNearbyServices };