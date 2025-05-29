from .repository import UserAmenityRepository

class UserAmenityService:
    def __init__(self):
        self.__userAmenity_repository = UserAmenityRepository()

    async def getUserAmenitiesByUserID(self, userID):
        result = await self.__userAmenity_repository.getUserAmenitiesByUserID(userID)

        userAmenities = [{
            "_id": str(userAmenity["_id"]),
            "userID": userAmenity["userID"],
            "amenityID": userAmenity["amenityID"],
            "amenityName": userAmenity["amenityName"],
            "isVisitted": userAmenity["isVisitted"]
        } for userAmenity in result]
        return userAmenities
    
    async def createUserAmenity(self, newUserAmenityDoc):
        result = await self.__userAmenity_repository.createUserAmenity(newUserAmenityDoc)
        return result