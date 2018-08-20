from django.shortcuts import render
from .models import Activity, Feature

# Create your views here.
from rest_framework import generics
from .serializers import ActivitySerializer, FeatureSerializer

class ActivityList(generics.ListCreateAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

class ActivityDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

class FeatureList(generics.ListCreateAPIView):
  queryset = Feature.objects.all().prefetch_related('activity')
  serializer_class = FeatureSerializer

class FeatureDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Feature.objects.all().prefetch_related('activity')
  serializer_class = FeatureSerializer
