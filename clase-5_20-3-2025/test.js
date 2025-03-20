const users2 = [
  {
    id: 1,
    name: "pepe"
  },
  {
    id: 2,
    name: "lolo"
  }
]

const usuarioEncontrado = users2.find(user => user.name === "pepe")

console.log(usuarioEncontrado)