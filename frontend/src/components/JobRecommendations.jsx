
import { useState } from "react"
import "./JobRecommendations.css"

function JobRecommendations({ jobs, resumes, aiRecommendations }) {
  const [search, setSearch] = useState("")

  const resumeSkills = (resumes?.[0]?.skills || "")
    .split(",")
    .map(skill => skill.trim().toLowerCase())
    .filter(Boolean)

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase())
  )
  
  const sortedJobs = [...filteredJobs].sort((a, b) => {
  const aMatch = aiRecommendations?.find(
    item => item.job_id === a.id
  )?.match_percentage || 0

  const bMatch = aiRecommendations?.find(
    item => item.job_id === b.id
  )?.match_percentage || 0

  return Number(bMatch) - Number(aMatch)
  })

  return (
    <div className="job-recommendations">
      <h2>Job Recommendations</h2>

      <input
        type="text"
        placeholder="Search by job title or company..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {sortedJobs.length > 0 ? (
        sortedJobs.map(job => {
          const requiredSkills = (job.required_skills || "")
            .split(",")
            .map(skill => skill.trim().toLowerCase())
            .filter(Boolean)

          const matchedSkills = requiredSkills.filter(skill =>
            resumeSkills.includes(skill)
          )

          const missingSkills = requiredSkills.filter(skill =>
            !resumeSkills.includes(skill)
          )

          const aiResult = aiRecommendations?.find(
            item => item.job_id === job.id
          )

          const matchPercentage = aiResult
            ? aiResult.match_percentage
            : 0

          return (
            <div className="job-card" key={job.id}>
              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <p>📍 {job.location}</p>
              <p>Required Skills: {job.required_skills}</p>

              <p>
                <strong>AI Match: {matchPercentage}%</strong>
              </p>

              <p>
                Matched Skills: {matchedSkills.join(", ") || "None"}
              </p>

              <p>
                Missing Skills: {missingSkills.join(", ") || "None"}
              </p>
            </div>
          )
        })
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  )
}

export default JobRecommendations
