from resumeapp.models import Job
from resumeapp.ai_engine import recommend_jobs

resume_text = """
Python Django SQL SQLite HTML CSS
JavaScript React Git Developer
"""

jobs = list(Job.objects.all())

results = recommend_jobs(resume_text, jobs)

print("\nAI JOB RECOMMENDATIONS\n")

for item in results:
    print("Job:", item["job"].title)
    print("Company:", item["job"].company)
    print("Match:", item["match_percentage"], "%")
    print("---------------------------")