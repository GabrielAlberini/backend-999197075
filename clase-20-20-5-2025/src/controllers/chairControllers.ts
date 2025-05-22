import { Request, Response } from "express"
import { Chair } from "../models/chairModel"
import { validatePartialChairData, validateChairData } from "../validators/chairValidator"

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
    // 68233ffb3f86906f03d72a93
    const id = req.params.id
    const deletedChair = await Chair.findByIdAndDelete(id)
    if (!deletedChair) return res.status(404).json({ sucess: false, message: "silla no encontrada" })
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

const createChair = async (req: Request, res: Response): Promise<any> => {
  try {
    const body = req.body

    const validator = validateChairData.safeParse(body)

    if (!validator.success) {
      return res.status(400).json({
        success: false,
        message: validator.error?.issues
      })
    }

    const newChair = new Chair(body)
    const savedChair = await newChair.save()
    res.status(201).json({
      success: true,
      data: savedChair,
      message: "silla creada con éxito"
    })
  } catch (error) {
    const err = error as Error
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

const updateChair = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = req.params.id
    const body = req.body // {color: "Azul", material: "Metal"}

    // 1 . validar lo que contiene el body
    // res.status(400).json({success: false, message: "bad request, invalid data"})
    // 2 . enviar data sanitizada a la db

    const validator = validatePartialChairData.safeParse(body)

    if (!validator.success) {
      return res.status(400).json({
        success: false,
        message: validator.error?.issues
      })
    }

    const updatedChair = await Chair.findByIdAndUpdate(id, body, { new: true })
    if (!updatedChair) return res.status(404).json({ success: false, message: "not found chair" })

    res.json({
      success: true,
      data: updatedChair,
      message: "silla actualizada con éxito"
    })
  } catch (error) {
    const err = error as Error
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

export { getAllChairs, deleteChair, createChair, updateChair }