// toma del input
// return del output

import { createUser, getUsers, getUserById, getUsersByName, updateUser, deleteUser } from "./logicaDeNegocio"

const main = async () => {
  let response;
  // array de argumentos -> node index.js 
  const args = process.argv.slice(2)

  // definiendo parametros en código
  let action = args[0]

  switch (action) {
    case "getUsers":
      response = await getUsers()
      break
    case "getUserById":
      response = await getUserById(args[1])
      break
    case "getUsersByName":
      response = await getUsersByName(args[1])
      break
    case "createUser":
      const newUser = {
        name: args[1],
        age: args[2],
        email: args[3],
        city: args[4],
        role: args[5]
      }
      response = await createUser(newUser)
      break
    case "updateUser":
      // node dist/index.js updateUser 23lk2j3k2kj3rnf name=pauli email=pauli@gmail.com
      // args -> updateUser 23lk2j3k2kj3rnf name=pauli email=pauli@gmail.com
      // updates -> [name=pauli, email=pauli@gmail.com]
      const id = args[1]
      const updates = args.slice(2)

      const updatesValues: any = {}

      updates.forEach((update) => {
        // name=paula                   ->  ["name", "paula"]
        // email=paula@gmail.com        ->  ["email", "paula@gmail.com"]
        const [key, value] = update.split("=")
        if (key && value) {
          updatesValues[key] = value
        }
      })

      console.log(updatesValues)

      response = await updateUser(id, updatesValues)
      break
    case "deleteUser":
      response = await deleteUser(args[1])
      break
    default:
      response = { error: "Acción no valida..." }
  }

  console.log(response)
}

main()
