import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
from social_django.utils import psa
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

class GoogleLogin(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        token = request.data.get('token')
        if token is None:
            return Response({'error': 'No token provided'}, status=status.HTTP_400_BAD_REQUEST)

        google_response = requests.get('https://www.googleapis.com/oauth2/v3/tokeninfo', 
                                       params={'id_token': token})
        if google_response.status_code != 200:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

        google_data = google_response.json()
        email = google_data.get('email')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            user = User.objects.create_user(
                email=email,
                username=email.split('@')[0], # Or set some other username rule
                password=User.objects.make_random_password()
            )

        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_200_OK)