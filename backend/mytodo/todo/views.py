from django.shortcuts import render
from rest_framework import viewsets
from .models import TodoItem
from .serializer import TodoItemSerializer

class TodoViewSet(viewsets.ModelViewSet):
    queryset = TodoItem.objects.all()
    serializer_class = TodoItemSerializer

# Create your views here.
