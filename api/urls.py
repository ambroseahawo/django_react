from django.urls import path, include
from .views import ArticleViewSet
from rest_framework.routers import DefaultRouter

app_name = "api"

router = DefaultRouter()
# takes three parameters - prefix, vieset, basename=None
router.register('articles', ArticleViewSet, basename='articles')

urlpatterns = [
    #path('', ArticleListViewMixin.as_view()),
    #path('<int:id>/', ArticleDetailViewMixin.as_view()),
    path('', include(router.urls)),
]
