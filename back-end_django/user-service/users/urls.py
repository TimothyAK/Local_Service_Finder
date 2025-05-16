from django.urls import path
from .views import SignUpController, LoginController

urlpatterns = [
    path('signup/', SignUpController.as_view(), name="signup"),
    path('login/', LoginController.as_view(), name="login")
]
