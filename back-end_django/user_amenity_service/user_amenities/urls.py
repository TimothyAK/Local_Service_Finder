from django.urls import path
from .views import GetUserAmenitiesByUserIDController, CreateUpdateUserAmenityController, GetUserAmenityByUserIDnAmenityIDController

urlpatterns = [
    path('', GetUserAmenitiesByUserIDController.as_view(), name="getHistory"),
    path('<str:amenityID>/', GetUserAmenityByUserIDnAmenityIDController.as_view(), name="getUserAmenity"),
    path('<str:amenityID>/', CreateUpdateUserAmenityController.as_view(), name="setUserAmenity")
]
