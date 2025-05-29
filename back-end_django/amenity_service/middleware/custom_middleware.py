import os
import jwt
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer

class JWTMiddleware():
    def __init__(self, get_response):
        self.get_response = get_response
        self.JWT_SECRET = os.getenv("JWT_SECRET") 

    def __call__(self, request):
        try:
            if(request.isProtected and request.headers['access-token']):
                print("Verifying Token")
                request.jwtPayload = jwt.decode(request.headers['access-token'], self.JWT_SECRET, 'HS256')

            response = self.get_response(request)
            return response
        except Exception as e:
            response = Response({
                "message": "Invalid Token"
            }, status=401)
            response.accepted_renderer = JSONRenderer()
            response.accepted_media_type = "application/json"
            response.renderer_context = {}
            response.render()
            return response

class RouteProtectionMiddleware():
    def __init__(self, get_response):
        self.get_response = get_response
        self.protected_routes = ['nearby'] 

    def __call__(self, request):
        print("Setting protected route validation variable")
        request.isProtected = False
        for route in self.protected_routes:
            if route in request.path:
                request.isProtected = True

        response = self.get_response(request)
        return response