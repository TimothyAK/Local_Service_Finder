from django.urls import path
from .views import SignUpController

urlpatterns = [
    path('signup/', SignUpController.as_view(), name="signup"),
]
