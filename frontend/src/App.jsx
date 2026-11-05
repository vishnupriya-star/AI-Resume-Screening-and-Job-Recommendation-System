
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
      }

    } catch (error) {
      console.log("Dashboard API Error:", error)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleResumeChange = async (resumeId) => {
    setSelectedResumeId(resumeId)

    try {
     const aiResponse = await fetch(
       `http://127.0.0.1:8000/api/ai-recommendations/?resume_id=${resumeId}`
      )

     const aiData = await aiResponse.json()
       setAiRecommendations(aiData)

    } 
    catch (error) {
      console.log("AI Recommendation Error:", error)
    }
  }
  
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
                        item => item.match_percentage
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
              value={selectedResumeId}
              onChange={(e) => handleResumeChange(e.target.value)}
            >
            {resumes.map((resume) => (
             <option key={resume.id} value={resume.id}>
               {resume.name}
             </option>
             ) )}
           </select>

            <CandidateDetails
              resumes={resumes.filter(
               (resume) => String(resume.id) === String(selectedResumeId)
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
             value={selectedResumeId}
             onChange={(e) => handleResumeChange(e.target.value)}>
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
            <div className="candidate-details">
              <h2>AI Resume Screening & Job Recommendation System</h2>
              <p>
                This project uses Python, Django, React and Machine
                Learning techniques to analyse resumes and recommend
                suitable jobs.
              </p>
              <p><strong>Frontend:</strong> React, HTML, CSS, JavaScript</p>
              <p><strong>Backend:</strong> Python, Django</p>
              <p><strong>Database:</strong> MySQL</p>
              <p><strong>AI Technique:</strong> TF-IDF and Cosine Similarity</p>
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
