
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('shorten/', views.shorten_url, name='shorten_url'),
    path('<str:short_code>/', views.redirect_to_long_url, name='redirect_to_long_url'),
]