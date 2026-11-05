
import "./JobComparison.css"

function JobComparison({ jobs, resumes, aiRecommendations,selectedResumeId }) {

  const selectedResume = resumes.find(
    resume => resume.id === Number(selectedResumeId)
  )

  const resumeSkills = (selectedResume?.skills || "")
   .split(",")
   .map(skill => skill.trim().toLowerCase())
   .filter(Boolean)



  const comparisonJobs = jobs.map(job => {

    const requiredSkills = (job.required_skills || "")
      .split(",")
      .map(skill => skill.trim())
      .filter(Boolean)

    const matchedSkills = requiredSkills.filter(skill =>
      resumeSkills.includes(skill.toLowerCase())
    )

    const missingSkills = requiredSkills.filter(skill =>
      !resumeSkills.includes(skill.toLowerCase())
    )

    const aiResult = aiRecommendations?.find(
      item => item.job_id === job.id
    )

    return {
      ...job,
      matchPercentage: aiResult
        ? aiResult.match_percentage
        : 0,
      matchedSkills,
      missingSkills
    }
  })
  comparisonJobs.sort((a, b) => {
    return Number(b.matchPercentage) - Number(a.matchPercentage)
  })

  return (
    <div className="job-comparison">

      <h2>Job Comparison</h2>
      <p>Compare your resume with available jobs</p>

      <div className="comparison-table-wrapper">
        <table className="comparison-table">

          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>AI Match</th>
              <th>Matched Skills</th>
              <th>Missing Skills</th>
            </tr>
          </thead>

          <tbody>
            {comparisonJobs.length > 0 ? (
              comparisonJobs.map(job => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{job.company}</td>
                  <td className="match-percentage">
                    {job.matchPercentage}%
                  </td>
                  <td>
                    {job.matchedSkills.join(", ") || "None"}
                  </td>
                  <td>
                    {job.missingSkills.join(", ") || "None"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No jobs available</td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </div>
  )
}

export default JobComparison
