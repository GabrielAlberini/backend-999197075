import express, { NextFunction, Request, Response } from "express"
import { connectDb } from "./config/connectDb"
import { authRouter } from "./routes/authRouter"
import { productRouter } from "./routes/productRouter"
import jwt, { JwtPayload } from "jsonwebtoken"

process.loadEnvFile()

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

// el index define que entidad quiere trabajar el user
app.use("/api/auth", authRouter)

// middleware -> "en el medio de..."
// el token le da acceso por tiempo limitado al usuario luego de verificar que existe
const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const header = req.headers.authorization
  const token = header?.split(" ")[1]

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "unauthorized, token is required"
    })
  }

  try {
    // validar el token existente
    const JWT_SECRET = process.env.JWT_SECRET!
    const decoded = jwt.verify(token, JWT_SECRET)
    // Enviarle a la petición que sigue, de quien corresponde
    next()
  } catch (error) {
    const err = error as Error
    res.status(401).json({ success: false, message: err.message })
  }
}

app.use("/api/products", authMiddleware, productRouter)

app.listen(PORT, () => {
  console.log(`✅ Servidor HTTP en escucha en el puerto ${PORT}`)
  connectDb()
})