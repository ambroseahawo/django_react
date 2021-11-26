from django.urls import path
from .views import ArticleListViewMixin, ArticleDetailViewMixin

app_name = "api"

urlpatterns = [
    path('', ArticleListViewMixin.as_view()),
    path('<int:id>/', ArticleDetailViewMixin.as_view()),
]
