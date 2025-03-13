import { useState, useEffect } from "react"

// props destructuring versión 2
const Destructuring = ({ nombre, apellido }) => {
  const [personajes, setPersonajes] = useState([])

  const traerPersonajes = async () => {
    const respuesta = await fetch("https://rickandmortyapi.com/api/character")
    const data = await respuesta.json(respuesta)
    setPersonajes(data.results)
  }

  useEffect(() => {
    traerPersonajes()
  }, [])

  console.log(personajes)

  // const { nombre } = props destructuring versión 1
  return (
    <div>
      <h1>{nombre} {apellido}</h1>
      <ul>
        {
          personajes.map(personaje => {
            const { id, name } = personaje
            return (
              <li>{id} - {name}</li>
            )
          }
          )
        }
      </ul>
    </div>
  )
}

export default Destructuring