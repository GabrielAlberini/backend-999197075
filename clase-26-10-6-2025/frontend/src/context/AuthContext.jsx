import { createContext, useContext, useState } from "react"
import { jwtDecode } from "jwt-decode"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState(token ? jwtDecode(localStorage.getItem("token")) : null)

  const login = (token) => {
    localStorage.setItem("token", token)
    setToken(token)
    setUser(jwtDecode(token))
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }