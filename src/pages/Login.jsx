import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const s = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 16px',
  },
  card: {
    background: '#ffffff',
    borderRadius: '20px',
    padding: '40px 36px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
  },
  logoRow: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '28px',
    gap: '8px',
  },
  logo: { fontSize: '2.5rem' },
  title: { fontSize: '1.7rem', fontWeight: '700', color: '#1a1a2e' },
  subtitle: { fontSize: '0.88rem', color: '#888', marginTop: '2px' },
  label: {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#444',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    border: '1.5px solid #ddd',
    borderRadius: '10px',
    fontSize: '0.97rem',
    transition: 'border-color 0.2s',
    background: '#fafafa',
  },
  field: { marginBottom: '18px' },
  btn: {
    width: '100%',
    padding: '13px',
    background: 'linear-gradient(135deg, #FFD700, #FFA500)',
    color: '#1a1a1a',
    fontWeight: '700',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    marginTop: '6px',
    transition: 'opacity 0.2s, transform 0.1s',
    letterSpacing: '0.3px',
  },
  error: {
    background: '#fff0f0',
    border: '1px solid #fcc',
    color: '#c0392b',
    borderRadius: '8px',
    padding: '10px 14px',
    fontSize: '0.88rem',
    marginBottom: '16px',
  },
  backLink: {
    display: 'block',
    textAlign: 'center',
    marginTop: '18px',
    fontSize: '0.88rem',
    color: '#777',
  },
}

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!username.trim() || !password.trim()) {
      setError('Please enter username and password.')
      return
    }
    setLoading(true)
    try {
      await login(username.trim(), password)
      navigate('/admin')
    } catch (err) {
      setError(err?.response?.data?.message || 'Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.logoRow}>
          <span style={s.logo}>💎</span>
          <h1 style={s.title}>Admin Login</h1>
          <span style={s.subtitle}>KA Calculator — Khatri Alankar</span>
        </div>

        {error && <div style={s.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={s.field}>
            <label style={s.label}>Username</label>
            <input
              style={s.input}
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoFocus
              onFocus={e => (e.target.style.borderColor = '#DAA520')}
              onBlur={e => (e.target.style.borderColor = '#ddd')}
            />
          </div>
          <div style={s.field}>
            <label style={s.label}>Password</label>
            <input
              style={s.input}
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onFocus={e => (e.target.style.borderColor = '#DAA520')}
              onBlur={e => (e.target.style.borderColor = '#ddd')}
            />
          </div>
          <button
            type="submit"
            style={{ ...s.btn, opacity: loading ? 0.7 : 1 }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <Link to="/" style={s.backLink}>← Back to Home</Link>
      </div>
    </div>
  )
}
