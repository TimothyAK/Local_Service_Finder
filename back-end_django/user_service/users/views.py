import jwt
import os
from datetime import datetime, timedelta, timezone
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
            if (not data["username"] or data["username"] == "" or not isinstance(data["username"], str) or 
                not data["email"] or data["email"] == "" or not isinstance(data["email"], str) or 
                not data["password"] or data["password"] == "" or not isinstance(data["password"], str)):
                raise Exception("Invalid Request Body", 400)
            
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
            
            try:
                if msg and e.args[1]:
                    return Response({
                        "message": e.args[0]
                    }, status=e.args[1])
            except IndexError:
                return Response({
                    "message": "Internal server error"
                }, status=500)
        
class LoginController(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.__user_service = UserService()

    async def post(self, request):
        try:
            data = request.data
            if (not data["email"] or data["email"] == "" or not isinstance(data["email"], str) or 
                not data["password"] or data["password"] == "" or not isinstance(data["password"], str)):
                raise Exception("Invalid Request Body", 400)
            
            userData = await self.__user_service.verifyUser(data)

            userData = {
                "userid": str(userData["userid"]),
                "username": userData["username"],
                "email": userData["email"],
                "exp": int((datetime.now(timezone.utc) + timedelta(hours=1)).timestamp())
            }

            token = jwt.encode(userData, os.getenv("JWT_SECRET"), 'HS256')

            return Response({
                "token": token
            })
        except Exception as e:
            print(e)
            msg = e.args[0]
            if(msg == "password" or msg == "email"):
                return Response({
                    "message": "Invalid request body"
                }, status=400)
            
            try:
                if msg and e.args[1]:
                    return Response({
                        "message": e.args[0]
                    }, status=e.args[1])
            except IndexError:
                return Response({
                    "message": "Internal server error"
                }, status=500)
        
class ResetPasswordController(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.__user_service = UserService()

    async def put(self, request):
        try:
            data = request.data
            if (not data["email"] or data["email"] == "" or not isinstance(data["email"], str) or
                not data["password"] or data["password"] == "" or not isinstance(data["password"], str) or
                not data["newPassword"] or data["newPassword"] == "" or not isinstance(data["newPassword"], str)):
                raise Exception("Invalid Request Body", 400)
            
            await self.__user_service.resetPassword(data)

            return Response({
                "message": "Password has been updated"
            })
        except Exception as e:
            msg = e.args[0]
            if (msg == "email" or msg == "password" or msg == "newPassword"):
                return Response({
                    "message": "Invalid request body"
                }, status=400)
            
            try:
                if msg and e.args[1]:
                    return Response({
                        "message": e.args[0]
                    }, status=e.args[1])
            except IndexError:
                return Response({
                    "message": "Internal server error"
                }, status=500)
            
class RequestResetController(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.__user_service = UserService()

    async def post(self, request):
        try:
            data = request.data
            if not data["email"] or data["email"] == "" or not isinstance(data["email"], str):
                raise Exception("Invalid Request Body", 400)
            
            await self.__user_service.sendResetPasswordEmail(data["email"])

            return Response({
                "message": "Email has been sent"
            })
        except Exception as e:
            msg = e.args[0]
            if msg == "email":
                return Response({
                    "message": "Invalid request body"
                }, status=400)
            try:
                if msg and e.args[1]:
                    return Response({
                        "message": e.args[0]
                    }, status=e.args[1])
            except IndexError:
                return Response({
                    "message": "Internal server error"
                }, status=500)
            
class DeleteAccountController(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.__user_service = UserService()

    async def delete(self, request):
        try:
            data = request.data
            if (not data["email"] or data["email"] == "" or not isinstance(data["email"], str) or
                not data["password"] or data["password"] == "" or not isinstance(data["password"], str)):
                raise Exception("Invalid Request Body", 400)
            
            await self.__user_service.deleteUser(data["email"], data["password"])

            return Response({
                "message": "Account has been deleted"
            })
        except Exception as e:
            msg = e.args[0]
            if msg == "email" or msg == "password":
                return Response({
                    "message": "Invalid request body"
                }, status=400)
            try:
                if msg and e.args[1]:
                    return Response({
                        "message": e.args[0]
                    }, status=e.args[1])
            except IndexError:
                return Response({
                    "message": "Internal server error"
                }, status=500)
