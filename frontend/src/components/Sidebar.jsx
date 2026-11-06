import './Sidebar.css'
import logo from '../assets/logo.png'
import dashboard from '../assets/dashboard.png'
import compareJobs from '../assets/compare jobs.png'
import about from '../assets/about.png'
import viewResult from '../assets/view result.png'
import uploadResume from '../assets/upload resume.png'
import ai from '../assets/ai.png'


function Sidebar({ activePage, setActivePage }) {
  const menuItems = [
    { name: "Dashboard", icon: dashboard },
    { name: "Upload Resume", icon: uploadResume },
    { name: "View Results", icon: viewResult },
    { name: "Compare Jobs", icon: compareJobs },
    { name: "About", icon: about}
  ]

  return (
    <div className="sidebar">

      <div className="sidebar-logo">
        <div className="robot">
          <img src={logo} alt=" AI Logo" />
        </div>
        <h2>AI Resume Screening</h2>
        <p>& Job Recommendation System</p>
      </div>

      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={activePage === item.name ? "active" : ""}
            onClick={() => setActivePage(item.name)}
          >
            <img src={item.icon} alt={item.name} />{item.name}
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        <h2>Your Career,<br />Powered by AI</h2>
        <div className="briefcase">
          <img src={ai} alt="AI" />
        </div>
      </div>

    </div>
  )
}

export default Sidebar