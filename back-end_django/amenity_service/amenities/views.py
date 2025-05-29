from adrf.views import APIView
from rest_framework.response import Response
from .service import AmenityService

class NearbySearchController(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.__amenity_service = AmenityService()

    def get(self, request):
        print(request.GET)
        return Response("OKE", status=200)