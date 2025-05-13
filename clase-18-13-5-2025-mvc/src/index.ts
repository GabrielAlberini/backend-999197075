// 1 . creación del servidor http
// 2 . conexión a db
// 3 . creación del esquema
// 4 . recibir y responder querys del usuario
import express from "express"
import { connect, Schema, model } from "mongoose"
process.loadEnvFile()

const PORT = process.env.PORT || 3000
const URI_DB = process.env.URI_DB || ""

const connectMongoDb = async () => {
  try {
    await connect(URI_DB)
    console.log(`✅ Conectado a MongoDB con éxito`)
  } catch (error) {
    console.log(`🚫 Error al conectarse a MongoDB`)
  }
}

const chairSchema = new Schema({
  name: { type: String, required: true, unique: true },
  material: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true, min: 0 }
}, {
  versionKey: false
});

const Chair = model("Chair", chairSchema)


const app = express()

app.get("/api/chairs", async (req, res): Promise<any> => {
  try {
    const chairs = await Chair.find()
    return res.json({
      success: true,
      data: chairs,
      message: "Recuperar todas las sillas"
    })
  } catch (error) {
    const err = error as Error
    return res.status(500).json({
      succes: false,
      message: err.message
    })
  }
})

app.listen(PORT, () => {
  console.log(`✅ Servidor en escucha en el puerto http://localhost:${PORT}`)
  connectMongoDb()
})