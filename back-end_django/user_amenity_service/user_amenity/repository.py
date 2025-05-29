from .models import UserAmenities

class UserAmenityRepository:
    def __init__(self):
        self.__UserAmenities = UserAmenities().getUserAmenitiesCollection()

    def getUserAmenitiesByUserID(self, userID):
        userAmenities = self.__UserAmenities.find({
            "userID": userID
        })

        return userAmenities
    
    def createUserAmenity(self, newUserAmenityDoc):
        result = self.__UserAmenities.insert_one(newUserAmenityDoc)
        return result.inserted_id
    
    def updateUserAmenity(self, userID, updatedUserAmenityDoc):
        result = self.__UserAmenities.update_one(
            {
                "userID": userID
            },
            {
                "$set": updatedUserAmenityDoc
            }
        )

        return result.modified_count > 0
    

    