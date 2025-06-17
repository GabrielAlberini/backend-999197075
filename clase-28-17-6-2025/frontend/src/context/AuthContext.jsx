import { createContext, useContext, useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null)
  const [user, setUser] = useState(token ? jwtDecode(localStorage.getItem("token")) : null)

  const login = (token) => {
    if (token !== undefined) {
      localStorage.setItem("token", token)
    }
    setToken(token)
    setUser(jwtDecode(token))
  }

  const isTokenExpired = (token) => {
    if (!token) return true
    try {
      const { exp } = jwtDecode(token)
      // exp viene en segundos, Date.now() en ms
      return exp * 1000 < Date.now()
    } catch (e) {
      // Si jwtDecode lanza error (token mal formado), consideramos expirado
      return true
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
  }

  useEffect(() => {
    if (isTokenExpired(token)) {
      logout()
    }
  }, [token])

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }