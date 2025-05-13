// 1 . creación del servidor http
// 2 . conexión a db
// 3 . creación del esquema
// 4 . recibir y responder querys del usuario
import express from "express"
import { connectMongoDb } from "./config/mongo"
import { chairRoutes } from "./routes/chairRoutes"
process.loadEnvFile()

const PORT = process.env.PORT || 3000

const app = express()

// quiero borrar una silla


app.use("/api/chairs", chairRoutes)

app.listen(PORT, () => {
  console.log(`✅ Servidor en escucha en el puerto http://localhost:${PORT}`)
  connectMongoDb()
})