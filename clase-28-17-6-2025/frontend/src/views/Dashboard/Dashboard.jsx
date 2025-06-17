import { useState } from "react"
import { Layout } from "../../components/Layout"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const Dashboard = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [category, setCategory] = useState("Sin categoria")
  const [errors, setErrors] = useState([])
  const [message, setMessage] = useState("")

  const navigate = useNavigate()

  const { token } = useAuth()

  const handleName = (event) => {
    setName(event.target.value)
  }

  const handlePrice = (event) => {
    setPrice(Number(event.target.value))
  }

  const handleCategory = (event) => {
    setCategory(event.target.value)
  }

  const handleSumbit = async (event) => {
    event.preventDefault()
    setErrors("")

    if (!name) {
      setErrors(prev => [...prev, "El nuevo producto debe incluir un nombre."])
    }

    if (price === 0) {
      setErrors(prev => [...prev, "¿Estas seguro que no quieres agregar el precio?"])
    }

    if (category === "Sin categoria") {
      setErrors(prev => [...prev, "¿Estas seguro que no quieres agregar la categoria?"])
    }

    // Creación del nuevo producto
    const newDataProduct = { name, price, category }

    try {
      const response = await fetch("http://localhost:1234/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newDataProduct)
      })

      if (response.ok) {
        setMessage("Producto agregado con éxito")
        setTimeout(() => {
          navigate("/")
        }, 3000)
      }
    } catch (error) {
      setErrors(prev => [...prev, error.message])
    }
  }

  return (
    <Layout>
      <h1>Agregar un nuevo producto</h1>
      <form onSubmit={handleSumbit}>
        <label htmlFor="name">Nombre:</label>
        <input type="text" name="name" onChange={handleName} value={name} />
        <label htmlFor="price">Price:</label>
        <input type="number" name="price" onChange={handlePrice} value={price} />
        <label htmlFor="category">Categoria:</label>
        <select onChange={handleCategory} name="category">
          <option value="Sin categoria" defaultValue>Sin categoria</option>
          <option value="living">Living</option>
          <option value="jardineria">Jardineria</option>
          <option value="dormitorio">Dormitorio</option>
          <option value="sala de juegos">Sala de juegos</option>
        </select>
        <button>Agregar</button>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {
          errors &&
          errors.map(error => (
            <p style={{ color: "red" }}>{error}</p>
          ))
        }
      </form>
    </Layout>
  )
}

export { Dashboard }