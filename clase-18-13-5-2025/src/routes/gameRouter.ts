import { Router } from "express"
import { createGame, getAllGames, getGameById, updateGame, deleteGame } from "../controllers/gameControllers"

const gameRouter = Router()

// TODAS LA REQ QUE LLEGAN ACÁ LLEGAN ASÍ: GET - http://localhost:1234/api/games/68233ffb3f86906f03d72a93

gameRouter.get("/", getAllGames)

// recuperar un juego mediante su id
gameRouter.get("/:id", getGameById)

// agregar un juego
gameRouter.post("/", createGame)

// actualizar un juego
gameRouter.patch("/:id", updateGame)

// borrar un juego
gameRouter.delete("/:id", deleteGame)

export { gameRouter }