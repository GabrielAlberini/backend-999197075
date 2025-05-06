// cada libro tiene que tener un titulo, un autor, un año, género
// definir para cada propiedad sus validadores
import { Schema, model } from "mongoose"

const bookSchema = new Schema({
  title: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true, enum: ['terror', 'comedia', "aventura", "acción"] }
})

const Book = model("Book", bookSchema)

export { Book }