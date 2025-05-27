import express from "express"
import { connectDb } from "./config/connectDb"
import { authRouter } from "./routes/authRouter"
process.loadEnvFile()

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

// el index define que entidad quiere trabajar el user
app.use("/api/auth", authRouter)
// app.use("/api/product", productRouter)

app.listen(PORT, () => {
  console.log(`✅ Servidor HTTP en escucha en el puerto ${PORT}`)
  connectDb()
})