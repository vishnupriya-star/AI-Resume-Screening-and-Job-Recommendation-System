import "./CandidateDetails.css"
function CandidateDetails({ resumes }) {
  if (!resumes || resumes.length === 0) {
    return <p>No candidate details available.</p>
  }

  const candidate = resumes[0]

  return (
    <div className="candidate-details">
      <h2>Candidate Details</h2>

      <p><strong>Name:</strong> {candidate.name}</p>
      <p><strong>Email:</strong> {candidate.email}</p>
      <p><strong>Phone:</strong> {candidate.phone}</p>
      <p><strong>Education:</strong> {candidate.education}</p>
      <p><strong>Experience:</strong> {candidate.experience}</p>

      <h3>Skills Extracted</h3>
      <p>{candidate.skills}</p>
    </div>
  )
}

export default CandidateDetails

