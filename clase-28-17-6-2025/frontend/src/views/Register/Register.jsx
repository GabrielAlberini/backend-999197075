import { useState } from "react"
import { Layout } from "../../components/Layout"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
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

    setError("")

    const newDataUser = {
      email,
      password
    }

    // const validDomains = ["@gmail.com", "@yahoo.com", "@outlook.com", "@hotmail.com", "@icloud.com", "@protonmail.com"];

    // if (!validDomains.some(domain => email.endsWith(domain))) {
    //   setError("El correo electrónico debe ser de un proveedor conocido. Por favor, utilice un correo electrónico válido de proveedores como Gmail, Yahoo, Outlook, Hotmail, iCloud o ProtonMail.");
    //   return;
    // }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!emailRegex.test(email)) {
      setError("El correo electrónico no es válido. Por favor, ingrese un correo electrónico válido.")
      return
    }

    if (password.length < 6 || password.length > 12) {
      setError("La contraseña debe tener al menos 6 caracteres y un máximo de 12 caracteres.")
      return
    }

    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]+$/

    if (!passwordRegex.test(password)) {
      setError("La contraseña debe tener al menos un caracter especial.")
      return
    }

    try {
      const response = await fetch("http://localhost:1234/api/auth/register", {
        method: "POST",
        body: JSON.stringify(newDataUser),
        headers: { "Content-Type": "application/json" }
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message)
      }
      setEmail("")
      setPassword("")
      setMessage("Usuario registrado con éxito")
      setTimeout(() => {
        navigate("/login")
      }, 1500)
    } catch (err) {
      if (err.message.startsWith("E11000 ")) {
        setError("El registro ha sido denegado porque ya existe un usuario con ese correo electrónico. Por favor, utilice otro correo electrónico o recupere su contraseña.")
      }
      setError(error)
    }
  }

  return (
    <Layout>
      <h1>Registro</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmail}
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={handlePassword}
        />
        <button>Registrarme</button>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </Layout>
  )
}

export { Register }