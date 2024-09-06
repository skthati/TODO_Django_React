from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoViewSet, UserRegistrationView, CustomTokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'todo', TodoViewSet)

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
]
