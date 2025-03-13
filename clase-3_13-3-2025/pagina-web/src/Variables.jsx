const Variables = () => {

  let carrito = ["pc", "silla gamer", "teclado re capado"]

  carrito = "pepe" // no deberia cambiar el tipo de dato -> para ello utilizar const

  return (
    // <ul>
    //   {
    //     carrito.map(obj => <li>{obj}</li>)
    //   }
    // </ul>
    <h1>{carrito}</h1>
  )
}

export default Variables
