
from django.shortcuts import render, redirect
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Job, Resume
from .forms import ResumeForm
from .serializers import JobSerializer, ResumeSerializer

from pypdf import PdfReader
from .ai_engine import recommend_jobs


# Job List
def job_list(request):
    jobs = Job.objects.all()
    return JsonResponse({
        "jobs": list(jobs.values())
    })


# Resume Upload
def Resume_upload(request):
    if request.method == "POST":
        form = ResumeForm(request.POST, request.FILES)

        if form.is_valid():
            form.save()
            return redirect("job_list")
    else:
        form = ResumeForm()

    return render(request, "upload.html", {
        "form": form
    })


# Resume Screening
def screen_resume(request, resume_id):
    resume = Resume.objects.get(id=resume_id)

    reader = PdfReader(resume.resume_file.path)

    resume_text = ""

    for page in reader.pages:
        resume_text += page.extract_text() or ""

    skills = [
        "Python", "SQL", "Django", "HTML", "CSS",
        "JavaScript", "React", "Git",
        "Excel", "Power BI", "Tableau", "Statistics",
        "Pandas", "NumPy",
        "Recruitment", "Communication", "Payroll",
        "HR Management", "Employee Relations",
        "Accounting", "Tally", "GST",
        "Financial Reporting", "Taxation",
        "Java", "Spring Boot", "REST API", "Hibernate",
        "SEO", "SEM", "Google Analytics",
        "Social Media Marketing", "Content Marketing",
        "Google Ads", "UI Design", "UX Design",
        "Figma", "Adobe XD", "Wireframing", "Prototyping",
        "Machine Learning", "Manual Testing",
        "Automation Testing", "Selenium", "Bug Tracking",
        "Network Security", "Ethical Hacking",
        "Linux", "Cybersecurity", "Risk Assessment"
    ]

    extracted_skills = [
        skill for skill in skills
        if skill.lower() in resume_text.lower()
    ]

    return render(request, "screen_result.html", {
        "resume": resume,
        "extracted_skills": extracted_skills
    })


# Jobs API
@api_view(['GET'])
def job_api(request):
    jobs = Job.objects.all()
    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data)


# Resumes API
@api_view(['GET'])
def resume_api(request):
    resumes = Resume.objects.all()
    serializer = ResumeSerializer(resumes, many=True)
    return Response(serializer.data)


# AI Recommendation API
@api_view(['GET'])
def ai_recommendation_api(request):
    resume_id = request.query_params.get("resume_id")

    if not resume_id:
        return Response(
            {"error": "Resume ID is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        resume = Resume.objects.get(id=resume_id)

        reader = PdfReader(resume.resume_file.path)

        resume_text = ""

        for page in reader.pages:
            resume_text += page.extract_text() or ""

        skills = [
            "Python", "SQL", "Django", "HTML", "CSS",
            "JavaScript", "React", "Git",
            "Excel", "Power BI", "Tableau", "Statistics",
            "Pandas", "NumPy",
            "Recruitment", "Communication", "Payroll",
            "HR Management", "Employee Relations",
            "Accounting", "Tally", "GST",
            "Financial Reporting", "Taxation",
            "Java", "Spring Boot", "REST API", "Hibernate",
            "SEO", "SEM", "Google Analytics",
            "Social Media Marketing", "Content Marketing",
            "Google Ads", "UI Design", "UX Design",
            "Figma", "Adobe XD", "Wireframing", "Prototyping",
            "Machine Learning", "Manual Testing",
            "Automation Testing", "Selenium", "Bug Tracking",
            "Network Security", "Ethical Hacking",
            "Linux", "Cybersecurity", "Risk Assessment"
        ]

        extracted_skills = [
            skill for skill in skills
            if skill.lower() in resume_text.lower()
        ]

        resume_text += " " + " ".join(extracted_skills)

        jobs = list(Job.objects.all())

        recommendations = recommend_jobs(resume_text, jobs)

        results = []

        for item in recommendations:
            job = item["job"]

            results.append({
                "job_id": job.id,
                "title": job.title,
                "company": job.company,
                "location": job.location,
                "match_percentage": item["match_percentage"]
            })

        return Response(results)

    except Resume.DoesNotExist:
        return Response(
            {"error": "Resume not found"},
            status=status.HTTP_404_NOT_FOUND
        )
