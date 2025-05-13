import { IGame } from "../interfaces/Game"
import { Game } from "../models/gameModel"
import { Request, Response } from "express"

const getAllGames = async (req: Request, res: Response): Promise<any> => {
  try {
    const games = await Game.find()
    return res.json({
      success: true,
      data: games,
      messge: "Recuperando todos los juegos"
    })
  } catch (error) {
    const err = error as Error
    return res.status(500).json({ success: false, message: err.message })
  }
}

const getGameById = async (req: Request, res: Response): Promise<any> => {
  const id = req.params.id
  try {
    const foundGame = await Game.findById(id)
    if (!foundGame) return res.status(404).json({ success: false, message: "Juego no encontrado" })
    return res.json({ success: true, data: foundGame, message: "Recuperar juego por su id" })
  } catch (error) {
    const err = error as Error
    return res.status(500).json({ success: false, message: err.message })
  }
}

const createGame = async (req: Request, res: Response): Promise<any> => {
  const body = req.body
  const { title, genre, platform, developer, multiplayer } = body
  if (!title || !genre || !platform || !developer) return res.status(400).json({ success: false, message: "invalid data" })
  try {
    const newGameData: IGame = { title, genre, platform, developer }
    if (multiplayer !== undefined) newGameData.multiplayer = multiplayer
    const newGame = new Game(newGameData)
    await newGame.save()
    return res.status(201).json({ success: true, data: newGame, message: "Juego creado con éxito" })
  } catch (error) {
    const err = error as Error
    return res.status(500).json({ success: false, message: err.message })
  }
}

const updateGame = async (req: Request, res: Response): Promise<any> => {
  const id = req.params.id
  const body = req.body

  try {
    const updatedGame = await Game.findByIdAndUpdate(id, body, { new: true })
    if (!updatedGame) return res.status(404).json({ success: false, message: "Juego no encontrado" })
    return res.json({ success: true, data: updatedGame, message: "Juego actualizado con éxito" })
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

const deleteGame = async (req: Request, res: Response): Promise<any> => {
  const id = req.params.id
  try {
    const deletedGame = await Game.findByIdAndDelete(id)
    if (!deletedGame) return res.status(404).json({ success: false, message: "Juego no encontrado" })
    return res.json({ success: true, data: deletedGame, message: "Juego borrado con éxito" })
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

export { getAllGames, getGameById, createGame, updateGame, deleteGame }