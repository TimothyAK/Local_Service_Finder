from .repository import UserAmenityRepository

class UserAmenityService:
    def __init__(self):
        self.__userAmenityRepository = UserAmenityRepository()

    def getUserAmenitiesByUserID(self, userID):
        userAmenities = self.__userAmenityRepository.getUserAmenitiesByUserID(userID)
        return userAmenities
    
    def createUserAmenity(self, newUserAmenityDoc):
        result = self.__userAmenityRepository.createUserAmenity(newUserAmenityDoc)
        return result