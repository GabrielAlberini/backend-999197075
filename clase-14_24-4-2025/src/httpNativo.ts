import protocolHttp from "node:http"

const products = [{ id: 1, name: "pc", price: 1000 }]
const users = [{ id: 1, name: "Matías", lastname: "Ardubino" }]

const handlePetiton = (request: any, response: any) => {
  // headers -> encabezado -> metainformación para manejar la respuesta 
  // todas las respuestas serán un JSON
  if (request.url === "/users") {
    response.writeHead(200, { "Content-Type": "application/json" })
    response.end(JSON.stringify(users))
  } else if (request.url === "/products") {
    response.writeHead(200, { "Content-Type": "application/json" })
    response.end(JSON.stringify(products))
  } else {
    response.writeHead(404, { "Content-Type": "application/json" })
    response.end(JSON.stringify({ error: "not resource" }))
  }
}

const serverHttp = protocolHttp.createServer(handlePetiton)

// definiendo un servicio de tomar o brindar data por un puerto especifico
// primer parámetro para levantar un servidor es el puerto
// segundo parámetro es una función que se ejecuta cuando el servidor empieza a escuchar.
// las pc tienen aprox 65000
serverHttp.listen(3000, () => {
  console.log("Servidor funcionando!")
})