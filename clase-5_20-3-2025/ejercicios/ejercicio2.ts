// Dada una lista de usuarios retornar un usuario por su nombre
// Devolver el usuario: Federico Rosales

interface User {
  id: number
  name: string
  email: string
  age: number
  isAdmin: boolean
}

const users: User[] = [
  { id: 1, name: "Juan Pérez", email: "juan@example.com", age: 30, isAdmin: false },
  { id: 4, name: "Ana García", email: "ana@example.com", age: 25, isAdmin: false },
  { id: 2, name: "María López", email: "maria@example.com", age: 25, isAdmin: true },
  { id: 3, name: "Martin Beron", email: "carlos@example.com", age: 35, isAdmin: false },
  { id: 4, name: "Ana Pérez", email: "ana@example.com", age: 23, isAdmin: false },
  { id: 5, name: "Pedro Fernández", email: "pedro@example.com", age: 40, isAdmin: true }
];

// const searchUser = (username: string) => {
//   const usernameTolowerCase = username.toLowerCase()

//   const foundUser: User | string =
//     users.find((user) =>
//       user.name.toLowerCase() === usernameTolowerCase) ||
//     "Usuario no encontrado"

//   return foundUser
// }

// Encontrar usuario si el nombre incluye parámentro
// const searchUser = (username: string) => {
//   const usernameTolowerCase = username.toLowerCase()

//   const foundUser: User | string =
//     users.find((user) =>
//       user.name.toLowerCase().includes(usernameTolowerCase)) ||
//     "Usuario no encontrado"

//   return foundUser
// }


const searchUsers = (username: string): User[] | string => {
  const usernameTolowerCase = username.toLowerCase()

  return users.filter((user) =>
    user.name.toLowerCase().includes(usernameTolowerCase))
}

export { searchUsers }




