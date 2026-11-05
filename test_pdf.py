
from pypdf import PdfReader
from pathlib import Path

pdf_folder = Path("media/resumes")
pdf_files = list(pdf_folder.glob("*.pdf"))

if pdf_files:
    pdf_path = pdf_files[0]
    reader = PdfReader(str(pdf_path))

    text = ""

    for page in reader.pages:
        text += page.extract_text() or ""

    print("RESUME TEXT:")
    print(text)

    skills_list = [
        "Python", "SQL", "Django",
        "HTML", "CSS", "JavaScript",
        "React", "AWS", "Git"
    ]

    found_skills = []

    for skill in skills_list:
        if skill.lower() in text.lower():
            found_skills.append(skill)

    print("FOUND SKILLS:", found_skills)

    job_skills = [
        "Python", "SQL", "Django",
        "HTML", "CSS", "JavaScript"
    ]

    matched_skills = []
    missing_skills = []

    for skill in job_skills:
        if skill.lower() in [s.lower() for s in found_skills]:
            matched_skills.append(skill)
        else:
            missing_skills.append(skill)

    print("MATCHED SKILLS:", matched_skills)
    print("MISSING SKILLS:", missing_skills)

    if job_skills:
        match_percentage = (len(matched_skills) / len(job_skills)) * 100
    else:
        match_percentage = 0
    print("MATCH PERCENTAGE:", round(match_percentage, 2), "%")    


else:
    print("PDF file not found!")