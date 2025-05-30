from django.urls import path
from .views import UserAmenityController, CreateUpdateUserAmenityController, GetUserAmenityByUserIDnAmenityIDController

urlpatterns = [
    path('', UserAmenityController.as_view(), name="getHistory"),
    path('<str:amenityID>/', CreateUpdateUserAmenityController.as_view(), name="setUserAmenity"),
    path('<str:amenityID>/', GetUserAmenityByUserIDnAmenityIDController.as_view(), name="getUserAmenity"),
]
