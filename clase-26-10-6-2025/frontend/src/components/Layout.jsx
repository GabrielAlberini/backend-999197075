import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Layout = ({ children }) => {
  const navigate = useNavigate()

  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <>
      <header>
        <nav>
          {
            user && (
              <ul>
                <li><Link to={"/"}>Inicio</Link></li>
                <button onClick={handleLogout}>Cerrar sesión</button>
              </ul>
            )
          }
          {
            !user && (
              <ul>
                <li><Link to={"/login"}>Login</Link></li>
                <li><Link to={"/register"}>Registro</Link></li>
              </ul>
            )
          }
        </nav>
      </header>
      <main>
        {children}
      </main>
      <footer>
        <p>Sitio creado por Gabriel Alberini</p>
      </footer>
    </>
  )
}

export { Layout }