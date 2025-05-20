import { Router } from "express"
import { getAllChairs, deleteChair, createChair, updateChair } from "../controllers/chairControllers"

const chairRoutes = Router()

// GET - http://localhost:1234/api/chairs/
chairRoutes.get("/", getAllChairs)

// DELETE - http://localhost:1234/api/chairs/68233ffb3f86906f03d72a93
chairRoutes.delete("/:id", deleteChair)

chairRoutes.post("/", createChair)

chairRoutes.patch("/:id", updateChair)

export { chairRoutes }