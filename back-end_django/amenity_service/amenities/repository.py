import requests

class AmenityRepository:
    def __init__(self):
        self.__base_url = "https://overpass-api.de/api/interpreter"

    def getQueryString(self, amenity_category, userRange):
        amenityQueryFnB = f"""
        [out:json];
        (
            node["amenity"~"restaurant|fast_food|cafe|pub|bar|food_court|biergarten|ice_cream"]["name"]{userRange};
            node["shop"~"bakery|confectionery|butcher|cheese|greengrocer|alcohol|beverages"]["name"]{userRange};
            way["amenity"~"restaurant|fast_food|cafe|pub|bar|food_court|biergarten|ice_cream"]["name"]{userRange};
            way["shop"~"bakery|confectionery|butcher|cheese|greengrocer|alcohol|beverages"]["name"]{userRange};
            relation["amenity"~"restaurant|fast_food|cafe|pub|bar|food_court|biergarten|ice_cream"]["name"]{userRange};
            relation["shop"~"bakery|confectionery|butcher|cheese|greengrocer|alcohol|beverages"]["name"]{userRange};
        );
        out center tags;
        """
        amenityQueryShopping = f"""
        [out:json];
        (
            node["shop"~"supermarket|mall|department_store|clothes|shoes|jewelry|optician|beauty|hairdresser|cosmetics|perfumery|books|stationery|electronics|mobile_phone|computer|hardware|furniture|doityourself|florist|gift|toys|sports|outdoor|second_hand|charity|travel_agency|laundry|dry_cleaning"]["name"]{userRange};
            way["shop"~"supermarket|mall|department_store|clothes|shoes|jewelry|optician|beauty|hairdresser|cosmetics|perfumery|books|stationery|electronics|mobile_phone|computer|hardware|furniture|doityourself|florist|gift|toys|sports|outdoor|second_hand|charity|travel_agency|laundry|dry_cleaning"]["name"]{userRange};
            relation["shop"~"supermarket|mall|department_store|clothes|shoes|jewelry|optician|beauty|hairdresser|cosmetics|perfumery|books|stationery|electronics|mobile_phone|computer|hardware|furniture|doityourself|florist|gift|toys|sports|outdoor|second_hand|charity|travel_agency|laundry|dry_cleaning"]["name"]{userRange};
        );
        out center tags;
        """
        amenityQueryFinance = f"""
        [out:json];
        (
            node["amenity"~"bank|atm|bureau_de_change"]["name"]{userRange};
            way["amenity"~"bank|atm|bureau_de_change"]["name"]{userRange};
            relation["amenity"~"bank|atm|bureau_de_change"]["name"]{userRange};
        );
        out center tags;
        """
        amenityQueryHealthcare = f"""
        [out:json];
        (
            node["amenity"~"hospital|clinic|doctors|dentist|pharmacy|health_post|nursing_home|veterinary"]["name"]{userRange};
            way["amenity"~"hospital|clinic|doctors|dentist|pharmacy|health_post|nursing_home|veterinary"]["name"]{userRange};
            relation["amenity"~"hospital|clinic|doctors|dentist|pharmacy|health_post|nursing_home|veterinary"]["name"]{userRange};
        );
        out center tags;
        """
        amenityQueryEntertainment = f"""
        [out:json];
        (
            node["amenity"~"cinema|theatre|nightclub|arts_centre"]["name"]{userRange};
            node["leisure"~"park|playground|water_park|stadium|sports_centre|ice_rink|golf_course|swimming_pool"]["name"]{userRange};
            node["tourism"~"theme_park|zoo|attraction|picnic_site|viewpoint"]["name"]{userRange};
            node["historic"~"castle|monument|memorial|ruins|archaeological_site"]["name"]{userRange};
            way["amenity"~"cinema|theatre|nightclub|arts_centre"]["name"]{userRange};
            way["leisure"~"park|playground|water_park|stadium|sports_centre|ice_rink|golf_course|swimming_pool"]["name"]{userRange};
            way["tourism"~"theme_park|zoo|attraction|picnic_site|viewpoint"]["name"]{userRange};
            way["historic"~"castle|monument|memorial|ruins|archaeological_site"]["name"]{userRange};
            relation["amenity"~"cinema|theatre|nightclub|arts_centre"]["name"]{userRange};
            relation["leisure"~"park|playground|water_park|stadium|sports_centre|ice_rink|golf_course|swimming_pool"]["name"]{userRange};
            relation["tourism"~"theme_park|zoo|attraction|picnic_site|viewpoint"]["name"]{userRange};
            relation["historic"~"castle|monument|memorial|ruins|archaeological_site"]["name"]{userRange};
        );
        out center tags;
        """
        if amenity_category == "FNB":
            return amenityQueryFnB
        elif amenity_category == "SHOPPING":
            return amenityQueryShopping
        elif amenity_category == "FINANCE":
            return amenityQueryFinance
        elif amenity_category == "HEALTHCARE":
            return amenityQueryHealthcare
        elif amenity_category == "ENTERTAINMENT":
            return amenityQueryEntertainment


    def getNearbyAmenities(self, userCoordinates, category):
        userRange = f"(around: 1000, {userCoordinates["lat"]}, {userCoordinates["lon"]})"
        amenityQuery = self.getQueryString(category, userRange)
        searchResponse = requests.post(self.__base_url, data=amenityQuery)
        return searchResponse.json()["elements"]


