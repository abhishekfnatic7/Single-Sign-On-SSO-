from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from accounts.views import  GoogleLogin
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

# router = DefaultRouter()
# router.register(r"users", CustomUserViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    # path(
    #     "social-auth/", include("social_django.urls", namespace="social")
    # ),  # Add this line
    # path("api/authentication/google/", GoogleLogin.as_view(), name="google_login"),
    # # path("api/", include(router.urls)),
    # path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    # path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # path("api/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path('sso/',include('ssoapp.urls'))
]
