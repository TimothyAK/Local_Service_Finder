from .repository import AmenityRepository, UserAmenityRepository

class AmenityService():
    def __init__(self):
        self.__amenity_repository = AmenityRepository()
        self.__userAmenity_repository = UserAmenityRepository()

    def searchNearbyAmenities(self, lat, lon, category, jwtPayload):
        if (not category in ["FNB", "SHOPPING", "FINANCE", "HEALTHCARE", "ENTERTAINMENT"]):
            raise Exception("Invalid request category", 404)

        try:
            searchResult = self.__amenity_repository.getNearbyAmenities({ "lat": lat, "lon": lon }, category)
            userAmenities = self.__userAmenity_repository.getUserAmenitiesByUserID(jwtPayload)

            formattedServices = []
            for amenity in searchResult:
                userAmenity = next((ua for ua in userAmenities if ua["amenityid"] == amenity["id"]), None)

                if amenity["type"] == "node" and userAmenity != None:
                    formattedServices.append({
                        "id": int(amenity["id"]),
                        "lat": amenity["lat"],
                        "lon": amenity["lon"],
                        "name": amenity["tags"]["name"],
                        "isVisitted": userAmenity["isVisitted"]
                    })
                    continue
                if amenity["type"] == "node":
                    formattedServices.append({
                        "id": int(amenity["id"]),
                        "lat": amenity["lat"],
                        "lon": amenity["lon"],
                        "name": amenity["tags"]["name"],
                        "isVisitted": False
                    })
                    continue
                if userAmenity != None:
                    formattedServices.append({
                        "id": int(amenity["id"]),
                        "lat": amenity["center"]["lat"],
                        "lon": amenity["center"]["lon"],
                        "name": amenity["tags"]["name"],
                        "isVisitted": userAmenity["isVisitted"]
                    })
                    continue
                formattedServices.append({
                    "id": int(amenity["id"]),
                    "lat": amenity["center"]["lat"],
                    "lon": amenity["center"]["lon"],
                    "name": amenity["tags"]["name"],
                    "isVisitted": False
                })


            return formattedServices
        except Exception as e:
            print(e)
            raise Exception("Internal server error", 500)