from django.urls import path
from .views import GetUserAmenitiesByUserIDController

urlpatterns = [
    path('<int:userID>/', GetUserAmenitiesByUserIDController.as_view(), name="getHistory"),
]
