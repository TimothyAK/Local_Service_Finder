from adrf.views import APIView
from rest_framework.response import Response
from .service import UserAmenityService

class GetUserAmenitiesByUserIDController(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.__userAmenity_service = UserAmenityService()

    async def get(self, request, userID):
        try:
            userAmenities = await self.__userAmenity_service.getUserAmenitiesByUserID(userID)

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
            
class CreateUpdateUserAmenityController(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.__userAmenity_service = UserAmenityService()

    async def post(self, request, userID, amenityID):
        try:
            data = request.data
            if(not isinstance(data["isVisitted"], bool) or
            not data["amenityName"] or data["amenityName"] == "" or not isinstance(data["amenityName"], str)):
                raise Exception("Invalid request body", 400)
            
            newUserAmenityDoc = {
                "userID": userID,
                "amenityID": amenityID,
                "amenityName": data["amenityName"],
                "isVisitted": data["isVisitted"]
            }
            userAmenityID = await self.__userAmenity_service.createUserAmenity(newUserAmenityDoc)

            return Response({
                "message": "User Amenity has been set"
            })
        except Exception as e:
            msg = e.args[0]

            print(e)

            try:
                return Response({
                    "message": msg
                }, e.args[1])
            except:
                return Response({
                    "message": "Internal server error"
                }, 500)