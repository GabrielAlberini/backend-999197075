import express from "express"
import { connectMongodb } from "./config/connectMongodb"
import { Schema, model } from "mongoose"
import { developers } from "./utils/developersData"
import { Game } from "./interfaces/Game"
process.loadEnvFile()

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

const gameSchema = new Schema({
  title: { type: String, required: true, unique: true },
  genre: { type: String, required: true },
  platform: { type: Array, require: true },
  developer: { type: String, require: true, enum: developers },
  multiplayer: { type: Boolean, default: false }
}, {
  versionKey: false
})

const Game = model("Game", gameSchema)

// CRUD -> crear, leer, actualizar y borrar
// recuperar todos los juegos
app.get("/api/games", async (req, res) => {
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
})



app.get("/api/games/:id", async (req, res) => {
  try {

  } catch (error) {

  }
})

// recuperar un juego mediante su id
// agregar un juego
app.post("/api/games", async (req, res) => {
  const body = req.body
  const { title, genre, platform, developer, multiplayer } = body
  if (!title || !genre || !platform || !developer) res.status(400).json({ success: false, message: "invalid data" })
  try {
    const newGameData: Game = { title, genre, platform, developer }
    if (multiplayer !== undefined) newGameData.multiplayer = multiplayer
    const newGame = new Game(newGameData)
    await newGame.save()
    res.status(201).json({ success: true, data: newGame, message: "Juego creado con éxito" })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// actualizar un juego
app.patch("/api/games/:id", async (req, res) => {
  try {

  } catch (error) {

  }
})

// borrar un juego
app.delete("/api/games/:id", async (req, res) => {
  try {

  } catch (error) {

  }
})

app.listen(PORT, () => {
  console.log(`Servidor en escucha en el puerto http://localhost:${PORT}`)
  connectMongodb()
})