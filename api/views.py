from django.shortcuts import render, HttpResponse, get_object_or_404
from .models import Article
from .serializers import ArticleModelSerializer
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import APIView
from rest_framework import generics
from rest_framework import mixins

# Create your views here.

# function implementation
# @csrf_exempt # to allow POST data from clients without csrf token
@api_view(['GET', 'POST'])  # allowed request methods
def article_list(request):
    # get all articles in the database
    if request.method == 'GET':
        articles = Article.objects.all()
        # when serializing a queryset, add the attr many = true
        serializer = ArticleModelSerializer(articles, many=True)
        # return JsonResponse(serializer.data, safe=False) # won return JsonResponse, mark safe to false
        return Response(serializer.data)  # browserable api
    elif request.method == 'POST':
        # data = JSONParser().parse(request)
        serializer = ArticleModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# function implementation
@api_view(['GET', 'PUT', 'DELETE'])  # allowed request methods
def article_detail(request, pk):
    # get specific article as per the id, if not available return 404
    article = get_object_or_404(Article, id=pk)
    if request.method == 'GET':
        # get the serialized article data
        serializer = ArticleModelSerializer(article)
        return Response(serializer.data)
    elif request.method == 'PUT':
        # data = JSONParser().parse(request)
        serializer = ArticleModelSerializer(article, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        article.delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)

# class implementation without mixins
class ArticleListView(APIView):
    def get(self, request):
        articles = Article.objects.all()
        serializer = ArticleModelSerializer(articles, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ArticleModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ArticleDetailView(APIView):
    def get_object(self, id):
        article = get_object_or_404(Article, id=id)
        return article

    def get(self, request, id):
        article = self.get_object(id)
        serializer = ArticleModelSerializer(article)
        return Response(serializer.data)

    def put(self, request, id):
        article = self.get_object(id)
        serializer = ArticleModelSerializer(article, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        article = self.get_object(id)
        article.delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)


# class implementation with mixins
class ArticleListViewMixin(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = Article.objects.all()
    # ArticleListViewMixin should either include a `serializer_class` attribute, or override the `get_serializer_class()` method.
    serializer_class = ArticleModelSerializer

    # get queryset list
    def get(self, request):
        return self.list(request)
    
    # post data
    def post(self, request):
        return self.create(request)

class ArticleDetailViewMixin(generics.GenericAPIView, mixins.RetrieveModelMixin, 
                            mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    queryset = Article.objects.all()
    serializer_class = ArticleModelSerializer
    # overides pk
    lookup_field = 'id'

    # get detail article
    def get(self, request, id):
        return self.retrieve(request, id=id)
    
    # update detail article
    def put(self, request, id):
        return self.update(request, id=id)

    # delete detail article
    def delete(self, request, id):
        return self.destroy(request, id=id)