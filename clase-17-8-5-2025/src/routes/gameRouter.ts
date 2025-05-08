import { Router } from "express"
import { IGame } from "../interfaces/Game"
import { Game } from "../models/gameModel"
import { getAllGames } from "../controllers/gameControllers"

const gameRouter = Router()

// TODAS LA REQ QUE LLEGAN ACÁ LLEGAN ASÍ: http://localhost:1234/api/games/2831093

gameRouter.get("/", getAllGames)

gameRouter.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const foundGame = await Game.findById(id)
    if (!foundGame) res.status(404).json({ success: false, message: "Juego no encontrado" })
    res.json({ success: true, data: foundGame, message: "Recuperar juego por su id" })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// recuperar un juego mediante su id
// agregar un juego
gameRouter.post("/", async (req, res) => {
  const body = req.body
  const { title, genre, platform, developer, multiplayer } = body
  if (!title || !genre || !platform || !developer) res.status(400).json({ success: false, message: "invalid data" })
  try {
    const newGameData: IGame = { title, genre, platform, developer }
    if (multiplayer !== undefined) newGameData.multiplayer = multiplayer
    const newGame = new Game(newGameData)
    await newGame.save()
    res.status(201).json({ success: true, data: newGame, message: "Juego creado con éxito" })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// actualizar un juego
gameRouter.patch("/:id", async (req, res) => {
  const id = req.params.id
  const body = req.body

  try {
    const updatedGame = await Game.findByIdAndUpdate(id, body, { new: true })
    if (!updatedGame) res.status(404).json({ success: false, message: "Juego no encontrado" })
    res.json({ success: true, data: updatedGame, message: "Juego actualizado con éxito" })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// borrar un juego
gameRouter.delete("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const deletedGame = await Game.findByIdAndDelete(id)
    if (!deletedGame) res.status(404).json({ success: false, message: "Juego no encontrado" })
    res.json({ success: true, data: deletedGame, message: "Juego borrado con éxito" })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export { gameRouter }