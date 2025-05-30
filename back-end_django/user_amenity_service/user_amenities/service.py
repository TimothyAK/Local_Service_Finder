from .repository import UserAmenityRepository

class UserAmenityService:
    def __init__(self):
        self.__userAmenity_repository = UserAmenityRepository()

    async def getUserAmenitiesByUserID(self, userid):
        try:
            result = await self.__userAmenity_repository.getUserAmenitiesByUserID(userid)

            userAmenities = [{
                "_id": str(userAmenity["_id"]),
                "amenityid": userAmenity["amenityid"],
                "amenityName": userAmenity["amenityName"],
                "isVisitted": userAmenity["isVisitted"]
            } for userAmenity in result]
            return userAmenities
        except:
            raise Exception("Internal server error")
        
    async def getUserAmenityByUserIDnAmenityID(self, userid, amenityid):
        try:
            result = await self.__userAmenity_repository.getUserAmenityByUserIDnAmenityID(userid, amenityid)

            if result != None:
                userAmenity = {
                    "_id": str(result["_id"]),
                    "amenityid": result["amenityid"],
                    "amenityName": result["amenityName"],
                    "isVisitted": result["isVisitted"]
                }
            else: 
                userAmenity = []
            return userAmenity 
        except:
            raise Exception("Internal server error")

    
    async def setUserAmenity(self, newUserAmenityDoc):
        try:
            userAmenity = await self.__userAmenity_repository.getUserAmenityByUserIDnAmenityID(newUserAmenityDoc["userid"], newUserAmenityDoc["amenityid"])

            if userAmenity == None:
                return await self.__userAmenity_repository.createUserAmenity(newUserAmenityDoc)
            else:
                return await self.__userAmenity_repository.updateUserAmenity(newUserAmenityDoc["userid"], newUserAmenityDoc["amenityid"], newUserAmenityDoc)
        except: 
            raise Exception("Internal server error")