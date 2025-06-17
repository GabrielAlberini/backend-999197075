import { NextFunction, Request, Response } from "express"
import { JwtPayload } from "jsonwebtoken"
import jwt from "jsonwebtoken"

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload
    }
  }
}

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

    req.user = decoded
    next()
  } catch (error) {
    const err = error as Error
    res.status(401).json({ success: false, message: err.message })
  }
}

export { authMiddleware }