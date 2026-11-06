
import { useState, useEffect } from "react"
import "./App.css"

import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import SummaryCards from "./components/SummaryCards"
import JobRecommendations from "./components/JobRecommendations"
import CandidateDetails from "./components/CandidateDetails"
import ResumeUpload from "./components/ResumeUpload"
import JobComparison from "./components/JobComparison"

function App() {
  const [jobs, setJobs] = useState([])
  const [resumes, setResumes] = useState([])
  const [aiRecommendations, setAiRecommendations] = useState([])
  const [activePage, setActivePage] = useState("Dashboard")
  const [selectedResumeId, setSelectedResumeId] = useState("")

  // Load Jobs, Resumes and AI Recommendations
  const loadData = async () => {
    try {
      const jobsResponse = await fetch(
        "http://127.0.0.1:8000/api/jobs/"
      )
      const jobsData = await jobsResponse.json()
      setJobs(jobsData)

      const resumesResponse = await fetch(
        "http://127.0.0.1:8000/api/resumes/"
      )
      const resumesData = await resumesResponse.json()

      const latestResumes = [...resumesData].reverse()
      setResumes(latestResumes)

      if (latestResumes.length > 0) {
        const latestResumeId = latestResumes[0].id

        setSelectedResumeId(latestResumeId)

        const aiResponse = await fetch(
          `http://127.0.0.1:8000/api/ai-recommendations/?resume_id=${latestResumeId}`
        )

        const aiData = await aiResponse.json()
        setAiRecommendations(aiData)
      } else {
        setAiRecommendations([])
        setSelectedResumeId("")
      }

    } catch (error) {
      console.log("Dashboard API Error:", error)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // Change Selected Resume
  const handleResumeChange = async (resumeId) => {
    setSelectedResumeId(resumeId)

    try {
      const aiResponse = await fetch(
        `http://127.0.0.1:8000/api/ai-recommendations/?resume_id=${resumeId}`
      )

      const aiData = await aiResponse.json()
      setAiRecommendations(aiData)

    } catch (error) {
      console.log("AI Recommendation Error:", error)
    }
  }

  // Page Navigation
  const renderPage = () => {
    switch (activePage) {

      case "Dashboard":
        return (
          <>
            <h1>Dashboard Overview</h1>
            <p>Welcome to AI Resume Dashboard</p>

            <SummaryCards
              totalJobs={jobs.length}
              totalResumes={resumes.length}
              screenedResumes={aiRecommendations.length > 0 ? 1 : 0}
              topMatch={
                aiRecommendations.length > 0
                  ? Math.max(
                      ...aiRecommendations.map(
                        item => Number(item.match_percentage)
                      )
                    )
                  : 0
              }
            />

            <JobRecommendations
              jobs={jobs}
              resumes={resumes}
              aiRecommendations={aiRecommendations}
            />
          </>
        )

      case "Upload Resume":
        return (
          <>
            <h1>Upload Resume</h1>
            <p>Upload your resume for AI screening</p>

            <ResumeUpload onUploadSuccess={loadData} />
          </>
        )

      case "View Results":
        return (
          <>
            <h1>Screening Results</h1>
            <p>Candidate details and extracted skills</p>

            <select
              className="resume-select"
              value={selectedResumeId}
              onChange={(e) => handleResumeChange(e.target.value)}
            >
              {resumes.map((resume) => (
                <option key={resume.id} value={resume.id}>
                  {resume.name}
                </option>
              ))}
            </select>

            <CandidateDetails
              resumes={resumes.filter(
                (resume) =>
                  String(resume.id) === String(selectedResumeId)
              )}
            />

            <JobRecommendations
              jobs={jobs}
              resumes={resumes}
              aiRecommendations={aiRecommendations}
            />
          </>
        )

      case "Compare Jobs":
        return (
          <>
            <h1>Compare Jobs</h1>
            <p>Compare available jobs and AI match percentages</p>

            <select
              className="resume-select"
              value={selectedResumeId}
              onChange={(e) => handleResumeChange(e.target.value)}
            >
              {resumes.map((resume) => (
                <option key={resume.id} value={resume.id}>
                  {resume.name}
                </option>
              ))}
            </select>

            <JobComparison
              jobs={jobs}
              resumes={resumes}
              aiRecommendations={aiRecommendations}
              selectedResumeId={selectedResumeId}
            />
          </>
        )

      case "About":
        return (
          <>
            <h1>About This Project</h1>

            <div className="candidate-details about-section">

              <h2>
                AI Resume Screening & Job Recommendation System
              </h2>

              <p className="about-description">
                This is an AI-powered web application that analyses
                uploaded resumes, extracts candidate skills, calculates
                job matching scores, and recommends suitable job
                opportunities using Machine Learning techniques.
              </p>

              <h3>Technology Stack</h3>

              <p>
                <strong>Frontend:</strong> React, HTML, CSS, JavaScript
              </p>

              <p>
                <strong>Backend:</strong> Python, Django
              </p>

              <p>
                <strong>Database:</strong> MySQL
              </p>

              <p>
                <strong>AI / ML:</strong> TF-IDF, Cosine Similarity
              </p>

              <p>
                <strong>Version Control:</strong> Git, GitHub
              </p>

              <h3>Key Features</h3>

              <ul className="about-features">
                <li>Resume PDF Upload</li>
                <li>Automatic Resume Text Extraction</li>
                <li>Candidate Skill Identification</li>
                <li>AI-Based Job Matching</li>
                <li>Job Recommendations</li>
                <li>Resume Comparison</li>
                <li>Match Percentage Analysis</li>
              </ul>

            </div>
          </>
        )

      default:
        return <h1>Dashboard Overview</h1>
    }
  }

  return (
    <div className="dashboard">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="main-content">

        <Header />

        <div className="dashboard-content">
          {renderPage()}
        </div>

      </div>
    </div>
  )
}

export default App
