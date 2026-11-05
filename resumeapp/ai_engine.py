from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def calculate_similarity(resume_text, job_description):

    documents = [resume_text, job_description]

    vectorizer = TfidfVectorizer()

    tfidf_matrix = vectorizer.fit_transform(documents)

    similarity = cosine_similarity(
        tfidf_matrix[0:1],
        tfidf_matrix[1:2]
    )

    match_percentage = round(similarity[0][0] * 100, 2)

    return match_percentage

def recommend_jobs(resume_text, jobs):

    if not resume_text or not jobs:
        return []

    job_documents = []

    for job in jobs:
        job_text = (
            job.title + " " +
            job.description + " " +
            job.required_skills
        )

        job_documents.append(job_text)

    documents = [resume_text] + job_documents

    vectorizer = TfidfVectorizer()

    tfidf_matrix = vectorizer.fit_transform(documents)

    similarity_scores = cosine_similarity(
        tfidf_matrix[0:1],
        tfidf_matrix[1:]
    )[0]

    recommendations = []

    for job, score in zip(jobs, similarity_scores):

        recommendations.append({
            "job": job,
            "match_percentage": round(score * 100, 2)
        })

    recommendations.sort(
        key=lambda item: item["match_percentage"],
        reverse=True
    )

    return recommendations