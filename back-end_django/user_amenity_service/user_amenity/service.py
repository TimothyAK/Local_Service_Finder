from .repository import UserAmenityRepository

class UserAmenityService:
    def __init__(self):
        self.__userAmenity_repository = UserAmenityRepository()

    async def getUserAmenitiesByUserID(self, userID):
        userAmenities = await self.__userAmenity_repository.getUserAmenitiesByUserID(userID)
        return userAmenities
    
    async def createUserAmenity(self, newUserAmenityDoc):
        result = await self.__userAmenity_repository.createUserAmenity(newUserAmenityDoc)
        return result