import { useAuth } from "../context/AuthContext"

const handleSubmit = (e, product, token) => {
  e.preventDefault()

  // Logica para actualizar un producto
  // fetch al backend

  console.log("Producto editado:", product)
}

const FormUpdate = ({ product, handleCancelEditing }) => {
  const { token } = useAuth()
  return (
    <form onSubmit={(e) => handleSubmit(e, product, token)}>
      <label htmlFor="name">Nombre:</label>
      <input type="text" name="name" />
      <label htmlFor="price">Price:</label>
      <input type="number" name="price" />
      <label htmlFor="category">Categoria:</label>
      <select name="category">
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