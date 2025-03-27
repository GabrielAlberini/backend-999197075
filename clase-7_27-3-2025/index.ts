import { readData, writeData } from "./controllers/userController";
import { User } from "./interfaces/User";

class UserManager {
  private users: User[] = []

  constructor() { }

  // 📌 Leer todos los registros
  public readUsers = async () => {
    try {
      this.users = await readData()
      console.log(this.users)
    } catch (error) {
      console.log("Error al leer los usuarios...")
    }
  }

  // 📌 Crear un nuevo registro
  public addUser = async (newUser: User) => {
    try {
      this.users = await readData()
      newUser.id = this.users.length + 1
      this.users.push(newUser)
      await writeData(this.users)
    } catch (error) {
      console.log("Error al agregar usuario...")
    }
  }

  // 📌 Actualizar un registro por ID
  public updateUser = async (id: number, newData: Partial<User>) => {
    try {
      const { direccion, nombre, edad, email } = newData

      this.users = await readData()

      const foundUser = this.users.find((user: User) => user.id === id)

      if (!foundUser) {
        console.log("No existe el usuario...")
      }

      if (foundUser) {
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
      }

      await writeData(this.users)
      console.log(foundUser)
    } catch (error) {
      console.log("Error al actualizar usuario...")
    }
  }

  // 📌 Eliminar un registro por ID
  public deleteUser = async (id: number) => {
    try {
      this.users = await readData()
      const newUsersList = this.users.filter((user: User) => user.id !== id)
      await writeData(newUsersList)
      console.log(newUsersList)
    } catch (error) {
      console.log("Error al borrar usuario...")
    }
  }
}

const userManager = new UserManager()

const users = userManager.readUsers()
console.log(users)


