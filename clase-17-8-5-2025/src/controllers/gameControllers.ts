import { Game } from "../models/gameModel"
import { Request, Response } from "express"

const getAllGames = async (req: Request, res: Response) => {
  try {
    const games = await Game.find()
    res.json({
      success: true,
      data: games,
      messge: "Recuperando todos los juegos"
    })
  } catch (error: any) {
    res.status(500).json({
      sucess: false,
      error: error.message
    })
  }
}

export { getAllGames }