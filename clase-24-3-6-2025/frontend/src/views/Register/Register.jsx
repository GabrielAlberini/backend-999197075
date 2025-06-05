import { useState } from "react"
import { Layout } from "../../components/Layout"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newDataUser = {
      email,
      password
    }

    try {
      const response = await fetch("http://localhost:1234/api/auth/register", {
        method: "POST",
        body: JSON.stringify(newDataUser),
        headers: { "Content-Type": "application/json" }
      })

      if (!response.ok) {
        throw new Error("Error al registrar el usuario :(")
      }

      navigate("/login")
    } catch (error) {
      setError(error.message)
    }
    setEmail("")
    setPassword("")
  }

  return (
    <Layout>
      <h1>Registro</h1>
      {error && <h2>{error}</h2>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmail}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={handlePassword}
        />
        <button>Registrarme</button>
      </form>
    </Layout>
  )
}

export { Register }