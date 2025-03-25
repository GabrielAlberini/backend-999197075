import { readData, writeData } from "./controllers/userController";
import { User } from "./interfaces/User";

// 📌 Leer todos los registros
const readUsers = async () => {
  try {
    const users = await readData()
    return users
  } catch (error) {
    console.log("Error al leer los usuarios...")
  }
}

// 📌 Crear un nuevo registro
const addUser = async (newUser: User) => {
  try {
    const users = await readUsers()
    newUser.id = users.length + 1
    users.push(newUser)
    await writeData(users)
  } catch (error) {
    console.log("Error al agregar usuario...")
  }
}

// 📌 Actualizar un registro por ID
const updateUser = async (id: number, newData: Partial<User>) => {
  try {
    const { direccion, nombre, edad, email } = newData

    const users = await readUsers()

    const foundUser = users.find((user: User) => user.id === id)

    if (!foundUser) {
      console.log("No existe el usuario...")
    }

    if (direccion) {
      foundUser.direccion = direccion
    }

    if (email) {
      foundUser.email = email
    }

    if (edad) {
      foundUser.edad = edad
    }

    if (nombre) {
      foundUser.nombre = nombre
    }

    await writeData(users)
    console.log(foundUser)
  } catch (error) {
    console.log("Error al actualizar usuario...")
  }
}

// 📌 Eliminar un registro por ID
const deleteUser = async (id: number) => {
  try {
    const users = await readUsers()
    const newUsersList = users.filter((user: User) => user.id !== id)
    await writeData(newUsersList)
    console.log(newUsersList)
  } catch (error) {
    console.log("Error al borrar usuario...")
  }
}
