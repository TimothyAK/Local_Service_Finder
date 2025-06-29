from django.urls import path
from .views import SignUpController, LoginController, ResetPasswordController, RequestResetController, DeleteAccountController

urlpatterns = [
    path('signup/', SignUpController.as_view(), name="signup"),
    path('login/', LoginController.as_view(), name="login"),
    path('reset_password/', ResetPasswordController.as_view(), name="reset_password"),
    path('request_reset/', RequestResetController.as_view(), name="request_reset"),
    path('delete_account/', DeleteAccountController.as_view(), name="delete_account")
]
