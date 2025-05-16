from adrf.views import APIView
from rest_framework.response import Response
from .service import UserService

# Create your views here.
class SignUpController(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.__user_service = UserService()
    
    async def post(self, request):
        try:
            data = request.data
            if (data["username"] == None or data["username"] == "" or 
                data["email"] == None or data["email"] == "" or 
                data["password"] == None or data["password"] == ""):
                raise Exception("Invalid Request Body")
            
            await self.__user_service.registerUser(data)

            return Response({
                "message": "User has been created"
            })
        except Exception as e:
            msg = e.args[0]
            if(msg == "password" or msg == "email" or msg == "username"):
                return Response({
                    "message": "Invalid request body"
                }, status=400)
            
            if msg:
                return Response({
                    "message": e.args[0]
                }, status=400)
            
            return Response({
                "message": "Internal server error"
            }, status=500)
            
