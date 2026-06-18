import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const s = {
  nav: {
    background: '#1a1a2e',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '8px',
    minHeight: '60px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
  },
  brandIcon: { fontSize: '1.4rem' },
  brandName: {
    fontSize: '1.15rem',
    fontWeight: '700',
    color: '#FFD700',
    letterSpacing: '0.3px',
  },
  brandSub: {
    fontSize: '0.72rem',
    color: '#6b82a0',
    fontWeight: '400',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
  },
  navLink: {
    padding: '7px 16px',
    borderRadius: '8px',
    fontSize: '0.88rem',
    fontWeight: '500',
    color: '#c8d6e5',
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.1)',
    textDecoration: 'none',
    transition: 'all 0.2s',
    cursor: 'pointer',
  },
  logoutBtn: {
    padding: '7px 16px',
    borderRadius: '8px',
    fontSize: '0.88rem',
    fontWeight: '500',
    color: '#ff7675',
    background: 'rgba(255,118,117,0.1)',
    border: '1px solid rgba(255,118,117,0.2)',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
}

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const isAdmin = location.pathname === '/admin'
  const isCalc = location.pathname === '/calculator'

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <nav style={s.nav}>
      <Link to="/" style={s.brand}>
        <span style={s.brandIcon}>💎</span>
        <div>
          <div style={s.brandName}>KA Calculator</div>
          <div style={s.brandSub}>Khatri Alankar Jewellers</div>
        </div>
      </Link>

      <div style={s.actions}>
        {isAdmin && (
          <Link to="/calculator" style={s.navLink}>
            🧮 Calculator
          </Link>
        )}
        {isCalc && isAuthenticated && (
          <Link to="/admin" style={s.navLink}>
            ⚙️ Admin
          </Link>
        )}
        {!isCalc && !isAdmin && (
          <Link to="/calculator" style={s.navLink}>
            🧮 Calculator
          </Link>
        )}
        {isAuthenticated ? (
          <button style={s.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login" style={s.navLink}>
            🔐 Login
          </Link>
        )}
      </div>
    </nav>
  )
}
