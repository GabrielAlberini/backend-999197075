import { Request, Response } from "express"
import { Chair } from "../models/chairModel"

const getAllChairs = async (req: Request, res: Response): Promise<any> => {
  try {
    const chairs = await Chair.find()
    return res.json({
      success: true,
      data: chairs,
      message: "Recuperar todas las sillas"
    })
  } catch (error) {
    const err = error as Error
    return res.status(500).json({
      succes: false,
      message: err.message
    })
  }
}

const deleteChair = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = req.params.id
    const deletedChair = await Chair.findByIdAndDelete(id)
    if (!deletedChair) return res.json({ sucess: false, message: "silla no encontrada" })
    return res.json({
      success: true,
      data: deletedChair,
      message: "silla borrada con éxito"
    })
  } catch (error) {
    const err = error as Error
    return res.json({
      success: false,
      message: err.message
    })
  }
}

export { getAllChairs, deleteChair }