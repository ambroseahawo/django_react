from django.urls import path
from .views import ArticleListView, ArticleDetailView

app_name = "api"

urlpatterns = [
    path('', ArticleListView.as_view()),
    path('<int:id>/', ArticleDetailView.as_view()),
]
