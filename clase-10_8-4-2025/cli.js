const args = process.argv.slice(2)
const action = args[0]
console.log(action, "<- acción elegida")

let response;

switch (action) {
  case "getUsers":
    response = "Obteniendo los usuarios..."
    break
  case "createUser":
    response = "Creando usuario..."
    break

  default:
    response = "Acción no reconocida..."
}

console.log(response)