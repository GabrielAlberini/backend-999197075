import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectMongoDb } from "./config/mongo"
import { chairRoutes } from "./routes/chairRoutes"

process.env.DEV_MODE === "production" ? dotenv.config() : process.loadEnvFile()

const PORT = process.env.PORT || 3000
const DEV_MODE = process.env.DEV_MODE

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/chairs", chairRoutes)

app.use("", (req, res) => {
  res.status(404).json({ success: false, message: "not found resource" })
})

app.listen(PORT, () => {
  if (DEV_MODE === "development") {
    console.log(`✅ Servidor en escucha en el puerto http://localhost:${PORT}`)
  } else if (DEV_MODE === "production") {
    console.log(`✅ Servidor HTTP en funcionamiento`)
  }
  connectMongoDb()
})