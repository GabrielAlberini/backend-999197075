// levantar los servicios
import express from "express"
import { connectMongodb } from "./config/connectMongodb"
import { gameRouter } from "./routes/gameRouter"
process.loadEnvFile()

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

app.use("/api/games", gameRouter)

app.listen(PORT, () => {
  console.log(`Servidor en escucha en el puerto http://localhost:${PORT}`)
  connectMongodb()
})