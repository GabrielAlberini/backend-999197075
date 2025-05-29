import { Router } from "express"
import { getAllProducts } from "../controllers/productControllers"

const productRouter = Router()

productRouter.get("/", getAllProducts)

export { productRouter }