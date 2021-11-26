from django.urls import path, include
from .views import ArticleModelViewSet, UserModelViewSet
from rest_framework.routers import DefaultRouter

app_name = "api"

router = DefaultRouter()
# takes three parameters - prefix, vieset, basename=None
router.register('articles', ArticleModelViewSet, basename='articles')
router.register('users', UserModelViewSet, basename='users')

urlpatterns = [
    #path('', ArticleListViewMixin.as_view()),
    #path('<int:id>/', ArticleDetailViewMixin.as_view()),
    path('api/', include(router.urls)),
]
