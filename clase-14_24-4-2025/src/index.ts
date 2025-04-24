import express from "express"

const products = [{ id: 1, name: "Chair", price: 2000 }]
const users = [{ id: 2, name: "Nicolás", lastname: "Giménez" }]

const app = express()

app.get("/users", (request, response) => {
  // express tiene un método dentro del objeto response que convierte
  // automaticamente un array en un json
  response.json(users)
})

app.get("/products", (request, response) => {
  response.json(products)
})

app.listen(3001, () => {
  console.log("Servidor de Express en funcionamiento!")
})