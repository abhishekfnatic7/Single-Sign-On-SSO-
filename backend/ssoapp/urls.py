from django.contrib import admin
from django.urls import path, include
from accounts.views import GoogleLogin
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    path("social-auth/", include("social_django.urls", namespace="social")),  # Add this line
    path("api/authentication/google/", GoogleLogin.as_view(), name="google_login"),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
]
