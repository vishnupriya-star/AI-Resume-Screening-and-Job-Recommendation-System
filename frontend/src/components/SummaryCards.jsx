
import './SummaryCards.css'

function SummaryCards({ totalJobs, totalResumes, screenedResumes, topMatch }) {
  return (
    <div className="summary-cards">

      <div className="summary-card purple">
        <div className="card-icon">📄</div>
        <h3>Total Resumes</h3>
        <h2>{totalResumes}</h2>
        <p>Uploaded Candidates</p>
      </div>

      <div className="summary-card blue">
        <div className="card-icon">💼</div>
        <h3>Total Jobs</h3>
        <h2>{totalJobs}</h2>
        <p>Available Jobs</p>
      </div>

      <div className="summary-card green">
        <div className="card-icon">📊</div>
        <h3>Screened Resumes</h3>
        <h2>{screenedResumes}</h2>
        <p>Completed Screening</p>
      </div>

      <div className="summary-card orange">
        <div className="card-icon">🏆</div>
        <h3>Top Match</h3>
        <h2>{topMatch}%</h2>
        <p>Highest AI Match</p>
      </div>

    </div>
  )
}

export default SummaryCards
