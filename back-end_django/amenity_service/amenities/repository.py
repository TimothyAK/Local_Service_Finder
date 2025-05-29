import requests
import json

class AmenityRepository:
    def __init__(self):
        self.__base_url = "https://overpass-api.de/api/interpreter"

    def get_amenity_query_string(amenity_category: str, user_range: str):
        amenityQueryFnB = f"""
        [out:json];
        (
            node["amenity"~"restaurant|fast_food|cafe|pub|bar|food_court|biergarten|ice_cream"]["name"]{user_range};
            node["shop"~"bakery|confectionery|butcher|cheese|greengrocer|alcohol|beverages"]["name"]{user_range};
            way["amenity"~"restaurant|fast_food|cafe|pub|bar|food_court|biergarten|ice_cream"]["name"]{user_range};
            way["shop"~"bakery|confectionery|butcher|cheese|greengrocer|alcohol|beverages"]["name"]{user_range};
            relation["amenity"~"restaurant|fast_food|cafe|pub|bar|food_court|biergarten|ice_cream"]["name"]{user_range};
            relation["shop"~"bakery|confectionery|butcher|cheese|greengrocer|alcohol|beverages"]["name"]{user_range};
        );
        out center tags 10;
        """
        amenityQueryShopping = f"""
        [out:json];
        (
            node["shop"~"supermarket|mall|department_store|clothes|shoes|jewelry|optician|beauty|hairdresser|cosmetics|perfumery|books|stationery|electronics|mobile_phone|computer|hardware|furniture|doityourself|florist|gift|toys|sports|outdoor|second_hand|charity|travel_agency|laundry|dry_cleaning"]["name"]{user_range};
            way["shop"~"supermarket|mall|department_store|clothes|shoes|jewelry|optician|beauty|hairdresser|cosmetics|perfumery|books|stationery|electronics|mobile_phone|computer|hardware|furniture|doityourself|florist|gift|toys|sports|outdoor|second_hand|charity|travel_agency|laundry|dry_cleaning"]["name"]{user_range};
            relation["shop"~"supermarket|mall|department_store|clothes|shoes|jewelry|optician|beauty|hairdresser|cosmetics|perfumery|books|stationery|electronics|mobile_phone|computer|hardware|furniture|doityourself|florist|gift|toys|sports|outdoor|second_hand|charity|travel_agency|laundry|dry_cleaning"]["name"]{user_range};
        );
        out center tags 10;
        """
        amenityQueryFinance = f"""
        [out:json];
        (
            node["amenity"~"bank|atm|bureau_de_change"]{user_range};
            way["amenity"~"bank|atm|bureau_de_change"]{user_range};
            relation["amenity"~"bank|atm|bureau_de_change"]{user_range};
        );
        out center tags 10;
        """
        amenityQueryHealthcare = f"""
        [out:json];
        (
            node["amenity"~"hospital|clinic|doctors|dentist|pharmacy|health_post|nursing_home|veterinary"]["name"]{user_range};
            way["amenity"~"hospital|clinic|doctors|dentist|pharmacy|health_post|nursing_home|veterinary"]["name"]{user_range};
            relation["amenity"~"hospital|clinic|doctors|dentist|pharmacy|health_post|nursing_home|veterinary"]["name"]{user_range};
        );
        out center tags 10;
        """
        amenityQueryEntertainment = f"""
        [out:json];
        (
            node["amenity"~"cinema|theatre|nightclub|arts_centre"]["name"]{user_range};
            node["leisure"~"park|playground|water_park|stadium|sports_centre|ice_rink|golf_course|swimming_pool"]["name"]{user_range};
            node["tourism"~"theme_park|zoo|attraction|picnic_site|viewpoint"]["name"]{user_range};
            node["historic"~"castle|monument|memorial|ruins|archaeological_site"]["name"]{user_range};
            way["amenity"~"cinema|theatre|nightclub|arts_centre"]["name"]{user_range};
            way["leisure"~"park|playground|water_park|stadium|sports_centre|ice_rink|golf_course|swimming_pool"]["name"]{user_range};
            way["tourism"~"theme_park|zoo|attraction|picnic_site|viewpoint"]["name"]{user_range};
            way["historic"~"castle|monument|memorial|ruins|archaeological_site"]["name"]{user_range};
            relation["amenity"~"cinema|theatre|nightclub|arts_centre"]["name"]{user_range};
            relation["leisure"~"park|playground|water_park|stadium|sports_centre|ice_rink|golf_course|swimming_pool"]["name"]{user_range};
            relation["tourism"~"theme_park|zoo|attraction|picnic_site|viewpoint"]["name"]{user_range};
            relation["historic"~"castle|monument|memorial|ruins|archaeological_site"]["name"]{user_range};
        );
        out center tags 10;
        """
        if amenity_category.find("FNB") != -1:
            return amenityQueryFnB
        elif amenity_category.find("SHOPPING") != -1:
            return amenityQueryShopping
        elif amenity_category.find("FINANCE") != -1:
            return amenityQueryFinance
        elif amenity_category.find("HEALTHCARE") != -1:
            return amenityQueryHealthcare
        elif amenity_category.find("ENTERTAINMENT") != -1:
            return amenityQueryEntertainment


    async def getNearbyAmenities(self, userCoordinates, category):
        userRange = f"(around: 1000, {userCoordinates["lat"]}, {userCoordinates["lon"]})"
        amenityQuery = self.get_amenity_query_string(category, userRange)
        searchResponse = await requests.post(self.__base_url, data=amenityQuery)
        return searchResponse.json()["elements"]


