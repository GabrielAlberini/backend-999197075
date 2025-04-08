import { createUser, getUsers, getUserById, getUserByName, updateUser, deleteUser } from "./logicaDeNegocio"

const main = async () => {
  let response;
  // array de argumentos -> node index.js 
  const args = process.argv.slice(2)

  // definiendo parametros en código
  let action = args[0]
  let id = ""
  let name = ""
  let newUser = {}
  let body = {}

  switch (action) {
    case "getUsers":
      response = await getUsers()
      break
    case "getUserById":
      response = await getUserById(id)
      break
    case "getUserByName":
      response = await getUserByName(name)
      break
    case "createUser":
      response = await createUser(newUser)
      break
    case "updateUser":
      response = await updateUser(id, body)
      break
    case "deleteUser":
      response = await deleteUser(id)
      break
    default:
      response = { error: "Acción no valida..." }
  }

  console.log(response)
}

main()
