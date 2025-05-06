import { connectMongoDb } from "./config/mongo"
import { Book } from "./models/bookModel"
import { createResToClient } from "./utils/createResToClient"
import express from "express"
process.loadEnvFile()

const PORT = process.env.PORT || 1234

const app = express()


// obtener todos los libros
// GET - http://localhost:2222/api/books
// callback -> función que se ejecuta despues de que pasa "algo"
app.get("/api/books", async (req, res) => {
  try {
    const books = await Book.find({})
    const resToClient = createResToClient(true, 200, "get all books", books)
    return res.json(resToClient)
  } catch (error: any) {
    const resToClient = createResToClient(false, 500, error.message)
    return res.json(resToClient)
  }
})

// agregar un libro
// POST - http://localhost:2222/api/books
app.post("/api/books", async (req, res) => {
  try {
    const { title, year, author, genre } = req.body
    if (!title || !year || !author || !genre) {
      const resToClient = createResToClient(false, 400, "invalid data")
      return res.status(400).json(resToClient)
    }

    const newBook = new Book({ title, year, author, genre })
    await newBook.save()

    const resToClient = createResToClient(true, 201, "book was added successfully", newBook)
    return res.status(201).json(resToClient)
  } catch (error: any) {
    const resToClient = createResToClient(false, 500, error.message)
    return res.status(500).json(resToClient)
  }
})


app.listen(PORT, () => {
  console.log("Conectado al servidor HTTP con éxito")
  connectMongoDb()
})