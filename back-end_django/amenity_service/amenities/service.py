from .repository import AmenityRepository

class AmenityService():
    def __init__(self):
        self.__amenity_repository = AmenityRepository()

    def searchNearbyAmenities(self, lat, lon, category):
        if (not category in ["FNB", "SHOPPING", "FINANCE", "HEALTHCARE", "ENTERTAINMENT"]):
            raise Exception("Invalid request category", 404)

        try:
            searchResult = self.__amenity_repository.getNearbyAmenities({ "lat": lat, "lon": lon }, category)

            formattedServices = []
            for amenity in searchResult:
                if amenity["type"] == "node":
                    formattedServices.append({
                        "id": amenity["id"],
                        "lat": amenity["lat"],
                        "lon": amenity["lon"],
                        "name": amenity["tags"]["name"]
                    })
                    continue
                formattedServices.append({
                    "id": amenity["id"],
                    "lat": amenity["center"]["lat"],
                    "lon": amenity["center"]["lon"],
                    "name": amenity["tags"]["name"]
                })

            return formattedServices
        except Exception:
            raise Exception("Internal server error", 500)