function Navbar({ activeView, onNavigate }) {
  const links = [
    { id: 'dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
    { id: 'expenses', label: 'Expenses', icon: 'bi-list-ul' },
    { id: 'add', label: 'Add Expense', icon: 'bi-plus-circle' },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark app-navbar">
      <div className="container">
        <span className="navbar-brand d-flex align-items-center gap-2">
          <i className="bi bi-wallet2"></i>
          Student Expense Tracker
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {links.map((link) => (
              <li className="nav-item" key={link.id}>
                <button
                  type="button"
                  className={`nav-link nav-btn ${activeView === link.id ? 'active' : ''}`}
                  onClick={() => onNavigate(link.id)}
                >
                  <i className={`bi ${link.icon} me-1`}></i>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
