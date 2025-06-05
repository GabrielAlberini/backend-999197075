import { useState, useEffect } from "react"
import { Layout } from "../../components/Layout"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const Home = () => {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)

  const { user } = useAuth()

  useEffect(() => {
    const fetchingProducts = async () => {
      const token = localStorage.getItem("token")
      try {
        const response = await fetch("http://localhost:1234/api/products", {
          headers: { Authorization: `Bearer ${token}` }
        }
        )

        if (!response.ok) {
          setError("Sesión terminada, vuelve a loguearte.")
          localStorage.removeItem("token")
          throw new Error("Falló el fetch :(")
        }
        const dataProducts = await response.json()

        setProducts(dataProducts.data)
      } catch (error) {
        console.log(error.message)
      }
    }

    fetchingProducts()
  }, [])

  return (
    <Layout>
      <h1>Lista de productos</h1>
      {user && <p>Bienvenido, {user.email}</p>}
      {error && <>
        <h2>{error}</h2>
        <Link to={"/login"}>Ir al login</Link>
      </>}
      {
        products.map((product) => {
          return (
            <div key={product._id}>
              <h2>{product.name}</h2>
              <p>{product.price}</p>
              <p>{product.category}</p>
            </div>
          )
        })
      }
    </Layout>
  )
}

export { Home }