// process.argv SIEMPRE es un array
// process.argv son los argumentos de la terminal a la hora de ejecutar el proceso
// const argumentos = process.argv
// const argsSinRutasDeNode = argumentos.slice(2)
// console.log(argsSinRutasDeNode)
import crypto from "node:crypto"

// id -> primary key -> unico | no se repite | no cambia
const usuarios = [
  { id: "f47ac10b-58cc-4372-a567-0e02b2c3d479", name: "Pepe" },
  { id: "9b2e7e8f-4c9d-4c3b-a37a-6d51f2f5f8e4", name: "Martín" }
]

const args = process.argv.slice(2)

const action = args[0]

console.log(action, "<-- input del usuario")

// let mensaje
// action === "getUser" ? mensaje = "Obteniendo usuario" : mensaje = "Necesitas permisos"
// console.log(mensaje)

if (action === "help") {
  console.log(`
    getUsers -> obtener usuarios
    getUser -> obtener usuario
    createUser -> crear usuarios
    updateUser -> actualizar usuario
    deleteUser -> borrar usuario
    `)
} else if (action === "getUsers") {
  console.log(usuarios)
} else if (action === "getUser") {
  // tomar el id refente al usuario que busco}
  const id = args[1]
  // buscar el usuario en la lista
  const usuarioEncontrado = usuarios.find((usuario) => usuario.id === id)
  if (usuarioEncontrado === undefined) {
    console.log("Usuario no encontrado...")
  } else {
    console.log(usuarioEncontrado, "<- usuario encontrado")
  }
} else if (action === "createUser") {
  const id = crypto.randomUUID()
  const name = args[1]

  const nuevoUsuario = { id, name }
  usuarios.push(nuevoUsuario)
  console.log(usuarios)
} else if (action === "updateUser") {
  const id = args[1]
  const nuevoNombre = args[2]

  const usuarioEncontrado = usuarios.find(u => u.id === id)

  if (!usuarioEncontrado) {
    console.log("Usuario no encontrado")
  }

  usuarioEncontrado.name = nuevoNombre
  console.log(usuarioEncontrado)
} else if (action === "deleteUser") {
  // solución 1 (costosa)
  const id = args[1]
  const usuarioEncontrado = usuarios.find((usuario) => usuario.id === id)
  if (usuarioEncontrado === undefined) {
    console.log("Usuario no encontrado...")
  } else {
    const index = usuarios.indexOf(usuarioEncontrado)
    usuarios.splice(index, 1)
    console.log(usuarioEncontrado, "<- usuario borrado")
  }

  // solución 2 (menos costosa)
  const index = usuarios.findIndex((u) => u.id === id)
  if (index === -1) {
    console.log("Usuario no encontrado...")
  } else {
    const usuarioBorrado = usuarios.splice(index, 1)
    console.log(usuarioBorrado, "<- usuario borrado")
  }
} else {
  console.log("Necesitas permisos...")
}

