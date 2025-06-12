import { Request, Response } from "express"
import { Auth } from "../models/authModel"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { validateUser } from "../validator/authValidator"

process.loadEnvFile()

const getUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await Auth.find({}, { password: 0 })
    res.json({
      success: true,
      data: users,
      message: "obteniendo todos los usuarios"
    })
  } catch (error) {
    const err = error as Error
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const body = req.body
    // incluir validaciones
    const validate = validateUser(req.body)

    if (!validate.success) {
      return res.status(400).json({
        success: false,
        message: "Bad request, invalid data"
      })
    }

    const hash = await bcrypt.hash(body.password, 10)

    const newUser = new Auth({ email: body.email, password: hash })
    await newUser.save()

    res.status(201).json({
      success: true,
      data: { _id: newUser._id, email: newUser.email },
      message: "usuario creado con éxito"
    })
  } catch (error) {
    const err = error as Error
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const body = req.body

    const foundUser = await Auth.findOne({ email: body.email })
    if (!foundUser) {
      return res.status(401).json({
        success: false,
        message: "unauthorized"
      })
    }

    const match = await bcrypt.compare(body.password, foundUser.password)
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "unauthorized"
      })
    }

    // generar la credencial que expira
    // payload
    // contraseña secreta
    // tiempo de expiración
    const payload = {
      id: foundUser._id,
      email: foundUser.email
    }

    const JWT_SECRET = process.env.JWT_SECRET!

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" })
    res.status(201).json({ token, user: { _id: foundUser._id, email: foundUser.email } })
  } catch (error) {
    const err = error as Error
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

export { getUsers, register, login }
