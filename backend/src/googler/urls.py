from django.urls import path

from googler import views

app_name = 'googler'
urlpatterns = [
    path('login/', views.google_login_view, name='login'),
    path('callback/', views.google_login_callback_view, name='callback'),
]
