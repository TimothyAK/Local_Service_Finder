from adrf.views import APIView
from rest_framework.response import Response
from .service import UserAmenityService

class GetUserAmenitiesByUserIDController:
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.__userAmenity_service = UserAmenityService()

    async def get(self, request, userID):
        if userID == 0:
            raise Exception("Invalid userID", 400)
        
        try:
            userAmenities = await self.__userAmenity_service.getUserAmenitiesByUserID(userID)

            return userAmenities
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