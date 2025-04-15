// procesar el input

import mongoose, { Document, Schema } from "mongoose";
import { connectDB } from "./config/mongo";
connectDB()

// usuario
// name -> string -> requerido
// age -> number -> requerido
// email -> string -> requerido -> tiene que pasar por una regex
// city -> string -> requerido
// role -> usuario / admin -> es opcional? o damos un valor por defecto

interface UserInterface extends Document {
  name: string
  age: number
  email: string
  city: string
  role?: "user" | "admin"
}

const userSchema: Schema = new Schema<UserInterface>({
  name: { type: String, required: true },
  age: { type: Number, required: true, min: 18 },
  email: { type: String, required: true, unique: true, match: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/ },
  city: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
}, { timestamps: false, versionKey: false })

userSchema.set("strict", true)

const User = mongoose.model<UserInterface>("user", userSchema)

// CRUD -> create, read, update, detele

// {sucess: false, data: object | array, message: "Usuario actualizado" | "No se encontro"}

const createUser = async (newUser: object) => {
  try {
    const user: UserInterface = new User(newUser)
    const newUserOnDb = await user.save() // ins{ a: 1 }ertOne()
    return { sucess: true, data: newUserOnDb, message: "Usuario creado" }
  } catch (error: any) {
    return { sucess: false, message: error.message }
  }
}

const getUsers = async () => {
  try {
    const users = await User.find()
    return { sucess: true, data: users, message: "Usuario filtrado por id" }
  } catch (error: any) {
    return { sucess: false, message: error.message }
  }
}

const getUserById = async (id: string) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      return { sucess: false, message: "Usuario no existente" }
    } else {
      return { sucess: true, data: user, message: "Usuario filtrado por id" }
    }
  } catch (error: any) {
    return { sucess: false, message: error.message }
  }
};

const getUsersByName = async (name: string) => {
  try {
    const users = await User.find({ name: { $regex: name, $options: "i" } })
    return { sucess: true, data: users, message: "Lista de usuarios filtrados por nombre" }
  } catch (error: any) {
    return { sucess: false, message: error.message }
  }
};

const updateUser = async (id: string, body: object) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, body, { new: true })
    if (!updatedUser) {
      return { sucess: false, message: "Usuario no existente" }
    } else {
      return { sucess: true, data: updatedUser, message: "Usuario actualizado" }
    }
  } catch (error: any) {
    return { sucess: false, message: error.message }
  }
}

const deleteUser = async (id: string) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id)
    if (!deletedUser) {
      return { sucess: false, message: "Usuario no existente" }
    } else {
      return { sucess: true, data: deletedUser, message: "Usuario actualizado" }
    }
  } catch (error: any) {
    return { sucess: false, message: error.message }
  }
}

export { createUser, getUsers, getUserById, getUsersByName, updateUser, deleteUser }

