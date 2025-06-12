import { Router } from "express"
import { createProduct, getAllProducts } from "../controllers/productControllers"

const productRouter = Router()

productRouter.get("/", getAllProducts)
productRouter.post("/", createProduct)

export { productRouter }