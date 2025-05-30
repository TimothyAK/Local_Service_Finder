from .models import UserAmenities

class UserAmenityRepository:
    def __init__(self):
        self.__UserAmenities = UserAmenities().getUserAmenitiesCollection()

    async def getUserAmenitiesByUserID(self, userid):
        cursor = self.__UserAmenities.find({
            "userid": userid
        })
        userAmenities = [userAmenity async for userAmenity in cursor]

        return userAmenities
    
    def getUserAmenityByUserIDnAmenityID(self, userid, amentyid):
        userAmenity = self.__UserAmenities.find_one({
            "userid": userid,
            "amenityid": amentyid
        })
        return userAmenity
    
    async def createUserAmenity(self, newUserAmenityDoc):
        await self.__UserAmenities.insert_one(newUserAmenityDoc)
    
    async def updateUserAmenity(self, userid, amenityid, newUserAmenityDoc):
        await self.__UserAmenities.update_one(
            {
                "userid": userid,
                "amenityid": amenityid
            },
            {
                "$set": newUserAmenityDoc
            }
        )
    

    