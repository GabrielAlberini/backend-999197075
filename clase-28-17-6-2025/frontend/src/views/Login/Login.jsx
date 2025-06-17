import { useState } from "react"
import { Layout } from "../../components/Layout"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const { login, token } = useAuth()

  const handleLogin = async (body) => {
    try {
      const response = await fetch("http://localhost:1234/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })

      if (!response.ok) {
        setError("Credenciales invalidas")
      }

      const token = await response.json()
      return token
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const dataUser = {
      email,
      password
    }

    const { token } = await handleLogin(dataUser)
    login(token)
    navigate("/")
  }

  return (
    <Layout>
      <h1>Login</h1>
      {
        !token && <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
          <button>Ingresar</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      }
      {token && <p>Hola! 😋</p>}
    </Layout>
  )
}

export { Login }