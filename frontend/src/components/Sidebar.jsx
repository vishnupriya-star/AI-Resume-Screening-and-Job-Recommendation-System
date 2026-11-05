import './Sidebar.css'

function Sidebar({ activePage, setActivePage }) {
  const menuItems = [
    { name: "Dashboard", icon: "⌂" },
    { name: "Upload Resume", icon: "⇧" },
    { name: "View Results", icon: "▥" },
    { name: "Compare Jobs", icon: "⚖" },
    { name: "About", icon: "ⓘ" }
  ]

  return (
    <div className="sidebar">

      <div className="sidebar-logo">
        <div className="robot">🤖</div>
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
            <span>{item.icon}</span> {item.name}
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        <h2>Find Your<br />Perfect Job</h2>
        <div className="briefcase">💼</div>
      </div>

    </div>
  )
}

export default Sidebar