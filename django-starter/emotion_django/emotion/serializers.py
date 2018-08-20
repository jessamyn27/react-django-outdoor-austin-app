from rest_framework import serializers
from .models import Activity, Feature

class ActivitySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
    	model = Activity
    	fields = ('id', 'photo_url', 'features',)



class FeatureSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Feature
        fields = ('id', 'title', 'photo_url',)
