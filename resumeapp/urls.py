
from django.urls import path
from . import views

urlpatterns = [
    path("", views.job_list, name="job_list"),
    path("upload/",views.Resume_upload,name="resume_upload"),
    path("screen/<int:resume_id>/", views.screen_resume, name="screen_resume"),
    path("api/jobs/", views.job_api, name="job_api"),
    path("api/resumes/", views.resume_api, name="resume_api"),
    path("api/ai-recommendations/", views.ai_recommendation_api, name="ai_recommendation_api"),
]
