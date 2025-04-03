import mongoose, { Document, ObjectId, Schema } from "mongoose";
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

const createUser = async () => {
  try {
    const user: UserInterface = new User({
      name: "Miguel Angel Baltazar Silva",
      age: 45,
      email: "miguel@gmail.com",
      city: "La Plata",
    })

    await user.save() // insertOne()
    console.log("Usuario creado :)")
  } catch (error) {
    console.log("Error al registrar usuario...", error)
  }
}

const getUsers = async () => {
  try {
    const users = await User.find()
    return users
  } catch (error) {
    console.log("Error al recuperar los usuarios...")
  }
}

const getUserById = async (id: string) => {
  try {
    const objectId = new mongoose.Types.ObjectId(id)
    const user = await User.findById(id);

    if (!user) {
      console.log("No existe el user...")
    } else {
      console.log(user);
    }
  } catch (error) {
    console.log("Error al recuperar los usuarios...");
  }
};

const getUserByName = async (name: string) => {
  try {
    // const users = await getUsers()
    // const user = users?.find(user => user.name.toLowerCase().includes(name.toLowerCase()))
    // console.log(user)

    const user = await User.findOne({ name: { $regex: name, $options: "i" } })

    if (!user) {
      console.log("No existe el user...")
    } else {
      console.log(user);
    }
  } catch (error) {
    console.log("Error al recuperar los usuarios...");
  }
};

