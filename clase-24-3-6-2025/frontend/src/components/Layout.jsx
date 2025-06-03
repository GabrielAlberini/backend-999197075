import { Link } from "react-router-dom"

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li><Link to={"/"}>Inicio</Link></li>
            <li><Link to={"/login"}>Login</Link></li>
            <li><Link to={"/register"}>Registro</Link></li>
          </ul>
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