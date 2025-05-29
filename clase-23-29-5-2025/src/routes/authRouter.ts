import { Router } from "express"
import { getUsers, createUser, login } from "../controllers/authControllers"

const authRouter = Router()

// aquí llegan todas las peticiones que comienzan con "/api/auth"
authRouter.get("/", getUsers)
authRouter.post("/register", createUser)
authRouter.post("/login", login)

export { authRouter }