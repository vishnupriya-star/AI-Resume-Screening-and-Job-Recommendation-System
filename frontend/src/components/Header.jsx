import './Header.css'

function Header() {
  return (
    <div className="header">

      <div className="header-title">
        <span className="header-icon">💼</span>
        <h2>AI Resume Screening & Job Recommendation System</h2>
      </div>

      <div className="header-profile">
        <div className="profile-icon">👤</div>

        <div>
          <p>Welcome,</p>
          <h3>Vishnupriya</h3>
        </div>

        <span className="dropdown">⌄</span>
      </div>

    </div>
  )
}

export default Header