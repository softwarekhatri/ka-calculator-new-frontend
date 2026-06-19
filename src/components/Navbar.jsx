import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function todayHindi() {
  return new Date().toLocaleDateString('hi-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

function todayEn() {
  return new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}

const s = {
  nav: {
    background: '#1a1a2e',
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '8px',
    minHeight: '64px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.35)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none',
  },
  logo: {
    height: '40px',
    width: 'auto',
    objectFit: 'contain',
    borderRadius: '6px',
  },
  brandText: {
    display: 'flex',
    flexDirection: 'column',
  },
  brandName: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#FFD700',
    letterSpacing: '0.3px',
    lineHeight: 1.2,
  },
  brandSub: {
    fontSize: '0.68rem',
    color: '#6b82a0',
    fontWeight: '400',
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1px',
  },
  dateHindi: {
    fontSize: '1rem',
    color: '#FFD700',
    fontWeight: '600',
  },
  dateEn: {
    fontSize: '0.88rem',
    color: '#6b82a0',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  },
  navLink: {
    padding: '7px 14px',
    borderRadius: '8px',
    fontSize: '0.85rem',
    fontWeight: '500',
    color: '#c8d6e5',
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.1)',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  logoutBtn: {
    padding: '7px 14px',
    borderRadius: '8px',
    fontSize: '0.85rem',
    fontWeight: '500',
    color: '#ff7675',
    background: 'rgba(255,118,117,0.1)',
    border: '1px solid rgba(255,118,117,0.2)',
    cursor: 'pointer',
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
      {/* Brand / Logo */}
      <Link to="/" style={s.brand}>
        <img src="/Khatri.ai.png" alt="KA Logo" style={s.logo} onError={e => { e.target.style.display = 'none' }} />
        <div style={s.brandText}>
          <div style={s.brandName}>KA Calculator</div>
          <div style={s.brandSub}>Khatri Alankar Jewellers</div>
        </div>
      </Link>

      {/* Today's date — center */}
      <div style={s.center}>
        <span style={s.dateHindi}>{todayHindi()}</span>
        <span style={s.dateEn}>{todayEn()}</span>
      </div>

      {/* Nav actions */}
      <div style={s.actions}>
        {isAdmin && (
          <Link to="/calculator" style={s.navLink}>🧮 Calculator</Link>
        )}
        {isCalc && isAuthenticated && (
          <Link to="/admin" style={s.navLink}>⚙️ Admin</Link>
        )}
        {!isCalc && !isAdmin && (
          <Link to="/calculator" style={s.navLink}>🧮 Calculator</Link>
        )}
        {isAuthenticated ? (
          <button style={s.logoutBtn} onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login" style={s.navLink}>🔐 Login</Link>
        )}
      </div>
    </nav>
  )
}
