import { createContext, useContext, useState, useEffect } from 'react'
import { login as apiLogin } from '../api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('ka_token')
    const username = localStorage.getItem('ka_username')
    if (token && username) {
      setUser({ token, username })
    }
  }, [])

  async function login(username, password) {
    const data = await apiLogin(username, password)
    const { token, user: userData } = data
    localStorage.setItem('ka_token', token)
    localStorage.setItem('ka_username', userData.username)
    setUser({ token, username: userData.username })
  }

  function logout() {
    localStorage.removeItem('ka_token')
    localStorage.removeItem('ka_username')
    setUser(null)
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
