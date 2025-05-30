from adrf.views import APIView
from rest_framework.response import Response
from bson import ObjectId
from .service import UserAmenityService

class GetUserAmenitiesByUserIDController(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.__userAmenity_service = UserAmenityService()

    async def get(self, request):
        try:
            jwtPayload = request.jwtPayload
            userAmenities = await self.__userAmenity_service.getUserAmenitiesByUserID(ObjectId(jwtPayload["userid"]))

            return Response({
                "data": userAmenities
            }, 200)
        except Exception as e:
            msg = e.args[0]

            try:
                return Response({
                    "message": msg
                }, e.args[1])
            except:
                return Response({
                    "message": "Internal server error"
                }, 500)
            
class GetUserAmenityByUserIDnAmenityIDController(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.__userAmenity_service = UserAmenityService()
    
    async def get(self, request, amenityID):
        try:
            jwtPayload = request.jwtPayload

            userAmenity = await self.__userAmenity_service.getUserAmenityByUserIDnAmenityID(ObjectId(jwtPayload["userid"]), int(amenityID))

            return Response({
                "data": userAmenity
            })

        except Exception as e:
            msg = e.args[0]

            try:
                return Response({
                    "message": msg
                }, e.args[1])
            except:
                return Response({
                    "message": "Internal server error"
                }, 500)
            
class CreateUpdateUserAmenityController(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.__userAmenity_service = UserAmenityService()

    async def post(self, request, amenityID):
        try:
            jwtPayload = request.jwtPayload
            data = request.data
            if(not isinstance(data["isVisitted"], bool) or
            not data["amenityName"] or data["amenityName"] == "" or not isinstance(data["amenityName"], str)):
                raise Exception("Invalid request body", 400)
            
            newUserAmenityDoc = {
                "userid": ObjectId(jwtPayload["userid"]),
                "amenityid": int(amenityID),
                "amenityName": data["amenityName"],
                "isVisitted": data["isVisitted"]
            }
            await self.__userAmenity_service.setUserAmenity(newUserAmenityDoc)

            return Response({
                "message": "User Amenity has been set"
            })
        except Exception as e:
            msg = e.args[0]

            try:
                return Response({
                    "message": msg
                }, e.args[1])
            except:
                return Response({
                    "message": "Internal server error"
                }, 500)