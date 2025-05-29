from .repository import UserAmenityRepository

class UserAmenityService:
    def __init__(self):
        self.__userAmenityRepository = UserAmenityRepository()

    async def getUserAmenitiesByUserID(self, userID):
        userAmenities = await self.__userAmenityRepository.getUserAmenitiesByUserID(userID)
        return userAmenities
    
    async def createUserAmenity(self, newUserAmenityDoc):
        result = await self.__userAmenityRepository.createUserAmenity(newUserAmenityDoc)
        return result