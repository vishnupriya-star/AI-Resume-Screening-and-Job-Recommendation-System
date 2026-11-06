import './Header.css'
import logo from '../assets/logo.png'
import user from '../assets/user.png'

function Header() {
  return (
    <div className="header">

      <div className="header-title">
        <span className="header-icon">
          <img src={logo} alt="AI Logo" />
        </span>
        <h2>AI Resume Screening & Job Recommendation System</h2>
      </div>

      <div className="header-profile">
        <div className="profile-icon">
          <img src={user} alt="User" />
        </div>

        <div>
          <p>Welcome,</p>
          <h3>Vishnupriya</h3>
        </div>

        
      </div>

    </div>
  )
}

export default Header