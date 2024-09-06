from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from .models import TodoItem
from .serializer import TodoItemSerializer, UserSerializer
from django.contrib.auth import get_user_model

class TodoViewSet(viewsets.ModelViewSet):
    queryset = TodoItem.objects.all()
    serializer_class = TodoItemSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return self.queryset.filter(user=user)
        return self.queryset.none()


class UserRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        data = request.data
        User = get_user_model()
        if User.objects.filter(username=data['username']).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.create(username=data['username'], email=data['email'], password=data['password'])
        user.set_password(data['password'])
        user.save()
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)


class CustomTokenObtainPairView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
        serializer = TokenObtainPairSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data)


class TokenRefreshView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        from rest_framework_simplejwt.views import TokenRefreshView as BaseTokenRefreshView
        return BaseTokenRefreshView.as_view()(request, *args, **kwargs)

    

# Create your views here.
