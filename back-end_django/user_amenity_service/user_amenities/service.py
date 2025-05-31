from .repository import UserAmenityRepository
from bson import ObjectId

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
                "amenityLat": userAmenity["amenityLat"],
                "amenityLon": userAmenity["amenityLon"],
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
        
    async def bulkSetUserAmenity(self, userid, newUserAmenityDocs):
        try:
            userid = ObjectId(userid)
            for doc in newUserAmenityDocs:
                newUserAmenityDoc = {}
                if doc.get('isVisitted') != None and isinstance(doc["isVisitted"], bool):
                    newUserAmenityDoc["isVisitted"] = doc["isVisitted"]
                if doc.get('name') != None and isinstance(doc["name"], str) and doc["name"] != "":
                    newUserAmenityDoc["amenityName"] = doc["name"]
                if doc.get('lat') != None and isinstance(doc["lat"], float) and doc["lat"] != 0:
                    newUserAmenityDoc["amenityLat"] = doc["lat"]
                if doc.get('lon') != None and isinstance(doc["lon"], float) and doc["lon"] != 0:
                    newUserAmenityDoc["amenityLon"] = doc["lon"]

                if not newUserAmenityDoc:
                    continue

                userAmenity = await self.__userAmenity_repository.getUserAmenityByUserIDnAmenityID(userid, doc["id"])

                if not userAmenity:
                    newUserAmenityDoc = {
                        "userid": userid,
                        "amenityid": doc["id"],
                        **newUserAmenityDoc
                    }
                    await self.__userAmenity_repository.createUserAmenity(newUserAmenityDoc)
                    continue
                
                await self.__userAmenity_repository.updateUserAmenity(userid, doc["id"], newUserAmenityDoc)
        except Exception as e:
            raise e