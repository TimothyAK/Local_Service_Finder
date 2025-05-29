from django.urls import path
from .views import GetUserAmenitiesByUserIDController, CreateUpdateUserAmenityController

urlpatterns = [
    path('', GetUserAmenitiesByUserIDController.as_view(), name="getHistory"),
    path('<str:amenityID>/', CreateUpdateUserAmenityController.as_view(), name="setUserAmenity")
]
