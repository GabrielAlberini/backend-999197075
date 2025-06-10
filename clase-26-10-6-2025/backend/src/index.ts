import express, { NextFunction, Request, Response } from "express"
import { connectDb } from "./config/connectDb"
import { authRouter } from "./routes/authRouter"
import { productRouter } from "./routes/productRouter"
import { authMiddleware } from "./middleware/authMiddleware"
import cors from "cors"

process.loadEnvFile()

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(cors())

// el index define que entidad quiere trabajar el user
app.use("/api/auth", authRouter)
app.use("/api/products", authMiddleware, productRouter)

app.listen(PORT, () => {
  console.log(`✅ Servidor HTTP en escucha en el puerto ${PORT}`)
  connectDb()
})