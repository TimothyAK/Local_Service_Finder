from .repository import AmenityRepository
from rest_framework.exceptions import APIException

class AmenityService():
    def __init__(self):
        self.__amenity_repository = AmenityRepository()

    async def searchNearbyAmenities(self, lat, lon, category):
        if (not category in ["FNB", "SHOPPING", "FINANCE", "HEALTHCARE", "ENTERTAINMENT"]):
            raise APIException("Invalid request categry", 404)
        

        try:
            searchResult = await self.__amenity_repository.getNearbyAmenities({ "lat": lat, "lon": lon }, category)

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
            raise APIException("Internal server error", 500)