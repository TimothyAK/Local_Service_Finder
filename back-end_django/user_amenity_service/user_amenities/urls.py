from django.urls import path
from .views import GetUserAmenitiesByUserIDController, CreateUpdateUserAmenityController

urlpatterns = [
    path('<str:userID>/', GetUserAmenitiesByUserIDController.as_view(), name="getHistory"),
    path('<str:userID>/<str:amenityID>/', CreateUpdateUserAmenityController.as_view(), name="setUserAmenity")
]
