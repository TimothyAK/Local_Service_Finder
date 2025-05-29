from .models import UserAmenities

class UserAmenityRepository:
    def __init__(self):
        self.__UserAmenities = UserAmenities().getUserAmenitiesCollection()

    async def getUserAmenitiesByUserID(self, userID):
        cursor = self.__UserAmenities.find({
            "userID": userID
        })
        userAmenities = [userAmenity async for userAmenity in cursor]

        return userAmenities
    
    async def createUserAmenity(self, newUserAmenityDoc):
        result = await self.__UserAmenities.insert_one(newUserAmenityDoc)
        return result.inserted_id
    
    async def updateUserAmenity(self, userID, amenityID, updatedUserAmenityDoc):
        result = await self.__UserAmenities.update_one(
            {
                "userID": userID,
                "amenityID": amenityID
            },
            {
                "$set": updatedUserAmenityDoc
            }
        )

        return result.modified_count > 0
    

    