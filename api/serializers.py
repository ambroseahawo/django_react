from rest_framework import serializers
from .models import Article
from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token

# class serializer
class ArticleSerializer(serializers.Serializer):
    # specify model types
    # use serializers instead of models
    title = serializers.CharField(max_length=100)
    description = serializers.CharField(max_length=400)

    # creating of the article
    def create(self, validated_data):
        return Article.objects.create(validated_data)

    # updating of the article
    def update(self, instance, validated_data):
        # get instance of the data entries
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('title', instance.description)


# class model serializer
class ArticleModelSerializer(serializers.ModelSerializer):
    class Meta:
        # specify the model
        model   = Article
        # specify the model fields as a list
        fields  = ['id', 'title', 'description']

class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']

        # password protection - when you GET users, the password field to be omitted
        extra_kwargs = {'password':{
            'write_only': True,
            'required': True
        }}

    # hash password
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        # create auth-token for each user
        Token.objects.create(user=user)
        return user