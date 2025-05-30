from rest_framework.views import APIView
from rest_framework.response import Response
from .service import AmenityService

class NearbySearchController(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.__amenity_service = AmenityService()

    def get(self, request):
        queryParams = request.GET
        try:
            if (not queryParams.get("lat") or not float(queryParams.get("lat")) or float(queryParams.get("lat")) == 0 or
                not queryParams.get("lon") or not float(queryParams.get("lon")) or float(queryParams.get("lon")) == 0 or
                not queryParams.get("category") or queryParams.get("category") == ""):
                raise Exception("Invalid request parameters", 400)
            
            searchResult = self.__amenity_service.searchNearbyAmenities(float(queryParams.get("lat")), float(queryParams.get("lon")), queryParams.get("category"), request.headers["access-token"])

            return Response({
                "data": searchResult
            }, 200)
        except ValueError as e:
            return Response({
                "message": "Invalid requets parameters"
            }, status=400)
        except Exception as e:
            msg = e.args[0]

            try:
                return Response({
                    "message": msg
                }, status=e.args[1])
            except:
                return Response({
                    "message": "Internal server error"
                }, 500)