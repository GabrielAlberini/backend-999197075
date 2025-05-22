// 1 . creación del servidor http
import os from 'node:os'
import express from "express"
import cors from "cors"
import { connectMongoDb } from "./config/mongo"
import { chairRoutes } from "./routes/chairRoutes"

process.loadEnvFile()

const PORT = process.env.PORT || 3000

const app = express()
// función para configurar las petición post
// permite capturar el json enviado en req.body
app.use(express.json())
app.use(cors())

// quiero borrar una silla
app.use("/api/chairs", chairRoutes)

app.use("", (req, res) => {
  res.status(404).json({ success: false, message: "not found resource" })
})

app.listen(PORT, () => {
  console.log(`✅ Servidor en escucha en el puerto http://localhost:${PORT}`)
  connectMongoDb()
})