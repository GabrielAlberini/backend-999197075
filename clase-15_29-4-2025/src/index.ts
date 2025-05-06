import express from "express"
import { connect, Schema, model } from "mongoose"

process.loadEnvFile()

const PORT = process.env.PORT
const URI_DB = process.env.URI_DB || ""

const connectDb = async () => {
  try {
    await connect(URI_DB)
    console.log("Conectado a Mongodb con éxito")
  } catch (error) {
    console.log("No se pudo conectar a Mongodb")
    console.log(error)
  }
}

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  password: { type: String, required: true }
}, { versionKey: false })

const User = model("User", userSchema)

const app = express()
// habilitar la posibilidad de que los usuarios puedan enviar json en el body
app.use(express.json())

// obtener todos los usuarios
app.get("/users", async (request, response) => {
  const users = await User.find()
  response.json(users)
})

// agregar usuario
app.post("/users", async (request, response) => {
  // obtener datos del nuevo usuario
  try {
    const body = request.body
    const { name, email, password, age } = body
    const newUserData = { name, email, password, age }
    const newUser = new User(newUserData)
    const savedUser = await newUser.save()
    response.status(201).json(savedUser)
  } catch (error) {
    response.status(500).json({ error: "Sucedió un error" })
  }
})

// borrar usuario
// ​DELETE - http://localhost:1234/users/6810e0563cbe0d58bbcc4866 -> peticion para borrar a franco
app.delete("/users/:id", async (request, response) => {
  try {
    const id = request.params.id
    const deletedUser = await User.findByIdAndDelete(id)
    if (!deletedUser) {
      response.status(404).json({ error: "usuario no encontrado" })
    } else {
      response.json(deletedUser)
    }
  } catch (error) {
    response.status(500).json({ error: "internal server error" })
  }
})

// http://localhost:1234
app.listen(PORT, () => {
  connectDb()
  console.log("Servidor HTTP conectado en http://localhost:" + PORT)
})