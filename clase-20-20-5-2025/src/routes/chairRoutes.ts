import { Router } from "express"
import { getAllChairs, deleteChair, createChair, updateChair } from "../controllers/chairControllers"

const chairRoutes = Router()

chairRoutes.get("/", getAllChairs)
chairRoutes.delete("/:id", deleteChair)
chairRoutes.post("/", createChair)
chairRoutes.patch("/:id", updateChair)

export { chairRoutes }