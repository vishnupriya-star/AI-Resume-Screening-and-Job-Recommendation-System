# AI Resume Screening & Job Recommendation System

An AI-powered web application that analyzes uploaded resumes and recommends suitable job opportunities based on skill matching and text similarity.

## Project Overview

The AI Resume Screening & Job Recommendation System helps candidates identify suitable job opportunities by analyzing their resume content and comparing it with job requirements.

Candidates can upload PDF resumes, view extracted skills, receive job recommendations, and compare their suitability for different roles.

## Technologies Used

### Frontend
- HTML
- CSS
- JavaScript
- React

### Backend
- Python
- Django
- Django REST Framework

### Database
- MySQL

### AI / Machine Learning
- TF-IDF Vectorization
- Cosine Similarity
- PDF Text Extraction using pypdf

### Version Control
- Git
- GitHub

## Key Features

- Upload resumes in PDF format.
- Extract text and skills from resumes.
- Analyze resumes against job descriptions.
- Calculate job matching percentages.
- Recommend suitable job opportunities.
- Display matched and missing skills.
- Compare multiple job opportunities.
- Search jobs by title and company.
- View candidate details and screening results.
- Store job and resume information in MySQL.
- Interactive React dashboard.

## How AI Matching Works

1. Candidate uploads a PDF resume.
2. The backend extracts text using pypdf.
3. TF-IDF converts resume and job description text into numerical vectors.
4. Cosine Similarity calculates the similarity score.
5. Jobs are ranked based on their matching scores.
6. The dashboard displays recommended jobs and skill comparisons.

**Note:** The matching percentage represents textual similarity between resume content and job requirements. It is not a probability of getting hired.

## Project Structure

```text
AI-Resume-Screening-and-Job-Recommendation-System/
│
├── config/
├── frontend/
├── resumeapp/
├── manage.py
├── requirements.txt
├── test_ai.py
├── test_pdf.py
└── .gitignore
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/vishnupriya-star/AI-Resume-Screening-and-Job-Recommendation-System.git
```

### 2. Backend Setup

```bash
cd AI-Resume-Screening-and-Job-Recommendation-System

python -m venv venv
venv\Scripts\activate

pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create a `.env` file in the project root.

```env
DJANGO_SECRET_KEY=your_secret_key
MYSQL_PASSWORD=your_mysql_password
```

Configure your MySQL database and credentials in Django settings.

### 4. Run Database Migrations

```bash
python manage.py migrate
```

### 5. Start Django Backend

```bash
python manage.py runserver
```

Backend: `http://127.0.0.1:8000/`

### 6. Start React Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173/`

## Future Enhancements

- Cloud deployment using AWS.
- Advanced NLP-based resume analysis.
- More accurate skill extraction.
- User authentication and role-based access.
- Additional job categories and recommendation improvements.

## Author

**VishnuPriya-R**

GitHub: https://github.com/vishnupriya-star

---

*Developed as a Python Full Stack and AI-based project.*
