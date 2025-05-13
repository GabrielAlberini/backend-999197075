import { Schema, model } from "mongoose"
import { developers } from "../utils/developersData"

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

export { Game }