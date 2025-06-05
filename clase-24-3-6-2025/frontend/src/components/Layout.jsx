import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const Layout = ({ children }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <>
      <header>
        <nav>
          <ul>
            <li><Link to={"/"}>Inicio</Link></li>
            <li><Link to={"/login"}>Login</Link></li>
            <li><Link to={"/register"}>Registro</Link></li>
          </ul>
          <button onClick={handleLogout}>Cerrar sesión</button>
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