from django.urls import path
from .views import NearbySearchController

urlpatterns = [
    path("nearby/", NearbySearchController.as_view(), name="nearby_search")
]
