import { Router } from "express"
import { getAllChairs, deleteChair } from "../controllers/chairControllers"

const chairRoutes = Router()

// GET - http://localhost:1234/api/chairs/
// DELETE - http://localhost:1234/api/chairs/68233ffb3f86906f03d72a93
chairRoutes.get("/", getAllChairs)
chairRoutes.delete("/:id", deleteChair)

export { chairRoutes }