// fetching de datos
import { useState, useEffect } from "react"
import "./App.css"

const App = () => {
  const [products, setProducts] = useState([])


  const fetchingProduct = async () => {
    const response = await fetch("https://fakestoreapi.com/products")
    const data = await response.json()
    setProducts(data)
  }

  // callback
  // array de dependencias
  // el fetch es asíncrono: son tareas en 2do plano y permite que el programa continue
  useEffect(() => {
    fetchingProduct()
  }, [])

  return (
    <>
      <h1>Página de productos</h1>
      <section>
        {
          products.map(product => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={`imagen de ${product.title}`} />
              <h2>{product.title}</h2>
              <p className="category">{product.category}</p>
              <p className="price">{product.price}</p>
              <p className="description">{product.description}</p>
            </div>
          ))
        }
      </section>
    </>
  )
}

export default App
