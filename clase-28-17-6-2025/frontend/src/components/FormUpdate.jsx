import { useState } from "react"
import { useAuth } from "../context/AuthContext"

const FormUpdate = ({ product, handleCancelEditing, fetchingProducts }) => {
  const [name, setName] = useState(product.name)
  const [price, setPrice] = useState(product.price)
  const [category, setCategory] = useState(product.category)
  const { token } = useAuth()

  const handleName = (e) => {
    setName(e.target.value)
  }
  const handlePrice = (e) => {
    setPrice(e.target.value)

  }
  const handleCategory = (e) => {
    setCategory(e.target.value)
  }

  const handleSubmit = async (e, product, token) => {
    e.preventDefault()

    // Logica para actualizar un producto
    // fetch al backend

    const response = await fetch(`http://localhost:1234/api/products/${product._id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, price, category })
    })
    if (response.ok) {
      fetchingProducts()
    }

    setName("")
    setPrice(0)
    setCategory("")
    handleCancelEditing()
  }


  return (
    <form onSubmit={(e) => handleSubmit(e, product, token)}>
      <label htmlFor="name">Nombre:</label>
      <input type="text" name="name" value={name} onChange={handleName} />
      <label htmlFor="price">Price:</label>
      <input type="number" name="price" value={price} onChange={handlePrice} />
      <label htmlFor="category">Categoria:</label>
      <select name="category" value={category} onChange={handleCategory}>
        <option value="Sin categoria" defaultValue>Sin categoria</option>
        <option value="living">Living</option>
        <option value="jardineria">Jardineria</option>
        <option value="dormitorio">Dormitorio</option>
        <option value="sala de juegos">Sala de juegos</option>
      </select>
      <div className="control-product">
        <button type="submit" className="btn-update">Actualizar</button>
        <button type="button" onClick={handleCancelEditing}>Cancelar</button>
      </div>
    </form>
  )
}

export { FormUpdate }