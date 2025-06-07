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

    throw new Error("Could not find location");
  } catch (err) {
    console.error("Geocoding error:", err.message);
    throw err;
  }
}

// Generate Overpass Query for a given category and range
function getOverpassQuery(category, lat, lng) {
  const radius = 1000;
  const userRange = `(around:${radius},${lat},${lng})`;

  const queries = {
    fnb: `
      [out:json];
      (
        node["amenity"~"restaurant|fast_food|cafe|pub|bar|food_court|biergarten|ice_cream"]["name"]${userRange};
        node["shop"~"bakery|confectionery|butcher|cheese|greengrocer|alcohol|beverages"]["name"]${userRange};
        way["amenity"~"restaurant|fast_food|cafe|pub|bar|food_court|biergarten|ice_cream"]["name"]${userRange};
        way["shop"~"bakery|confectionery|butcher|cheese|greengrocer|alcohol|beverages"]["name"]${userRange};
        relation["amenity"~"restaurant|fast_food|cafe|pub|bar|food_court|biergarten|ice_cream"]["name"]${userRange};
        relation["shop"~"bakery|confectionery|butcher|cheese|greengrocer|alcohol|beverages"]["name"]${userRange};
      );
      out center tags;
    `,
    shopping: `
      [out:json];
      (
        node["shop"~"supermarket|mall|department_store|clothes|shoes|jewelry|optician|beauty|hairdresser|cosmetics|perfumery|books|stationery|electronics|mobile_phone|computer|hardware|furniture|doityourself|florist|gift|toys|sports|outdoor|second_hand|charity|travel_agency|laundry|dry_cleaning"]["name"]${userRange};
        way["shop"~"supermarket|mall|department_store|clothes|shoes|jewelry|optician|beauty|hairdresser|cosmetics|perfumery|books|stationery|electronics|mobile_phone|computer|hardware|furniture|doityourself|florist|gift|toys|sports|outdoor|second_hand|charity|travel_agency|laundry|dry_cleaning"]["name"]${userRange};
        relation["shop"~"supermarket|mall|department_store|clothes|shoes|jewelry|optician|beauty|hairdresser|cosmetics|perfumery|books|stationery|electronics|mobile_phone|computer|hardware|furniture|doityourself|florist|gift|toys|sports|outdoor|second_hand|charity|travel_agency|laundry|dry_cleaning"]["name"]${userRange};
      );
      out center tags;
    `,
    finance: `
      [out:json];
      (
        node["amenity"~"bank|atm|bureau_de_change"]["name"]${userRange};
        way["amenity"~"bank|atm|bureau_de_change"]["name"]${userRange};
        relation["amenity"~"bank|atm|bureau_de_change"]["name"]${userRange};
      );
      out center tags;
    `,
    healthcare: `
      [out:json];
      (
        node["amenity"~"hospital|clinic|doctors|dentist|pharmacy|health_post|nursing_home|veterinary"]["name"]${userRange};
        way["amenity"~"hospital|clinic|doctors|dentist|pharmacy|health_post|nursing_home|veterinary"]["name"]${userRange};
        relation["amenity"~"hospital|clinic|doctors|dentist|pharmacy|health_post|nursing_home|veterinary"]["name"]${userRange};
      );
      out center tags;
    `,
    entertainment: `
      [out:json];
      (
        node["amenity"~"cinema|theatre|nightclub|arts_centre"]["name"]${userRange};
        node["leisure"~"park|playground|water_park|stadium|sports_centre|ice_rink|golf_course|swimming_pool"]["name"]${userRange};
        node["tourism"~"theme_park|zoo|attraction|picnic_site|viewpoint"]["name"]${userRange};
        node["historic"~"castle|monument|memorial|ruins|archaeological_site"]["name"]${userRange};
        way["amenity"~"cinema|theatre|nightclub|arts_centre"]["name"]${userRange};
        way["leisure"~"park|playground|water_park|stadium|sports_centre|ice_rink|golf_course|swimming_pool"]["name"]${userRange};
        way["tourism"~"theme_park|zoo|attraction|picnic_site|viewpoint"]["name"]${userRange};
        way["historic"~"castle|monument|memorial|ruins|archaeological_site"]["name"]${userRange};
        relation["amenity"~"cinema|theatre|nightclub|arts_centre"]["name"]${userRange};
        relation["leisure"~"park|playground|water_park|stadium|sports_centre|ice_rink|golf_course|swimming_pool"]["name"]${userRange};
        relation["tourism"~"theme_park|zoo|attraction|picnic_site|viewpoint"]["name"]${userRange};
        relation["historic"~"castle|monument|memorial|ruins|archaeological_site"]["name"]${userRange};
      );
      out center tags;
    `
  };

  return queries[category];
}

// Main service function
async function findNearbyServices({ lat, lng, category }) {
  const query = getOverpassQuery(category, lat, lng);
  if (!query) throw new Error("Invalid category");

  console.log("Overpass Query:\n", query);
  
  try {
    const res = await axios.post(
      "https://overpass-api.de/api/interpreter",
      `data=${encodeURIComponent(query)}`,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    if (res.data && res.data.elements?.length > 0) {
      return res.data.elements.map(elem => ({
        id: elem.id,
        name: elem.tags?.name || "Unnamed",
        lat: elem.lat || elem.center?.lat,
        lng: elem.lon || elem.center?.lon,
        type: elem.tags?.amenity || elem.tags?.shop || elem.tags?.leisure || elem.tags?.tourism || "N/A",
        category: category,
        address: `${elem.tags?.["addr:street"] || ""} ${elem.tags?.["addr:housenumber"] || ""}`.trim() || "N/A"
      }));
    }

    throw new Error("No services found");
  } catch (err) {
    console.error("Overpass API error:", err.response?.data || err.message);
    throw new Error("Service fetch failed");
  }
}

module.exports = { getLatLng, findNearbyServices };
