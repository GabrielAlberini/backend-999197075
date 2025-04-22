import fileSystem from "node:fs/promises"
import crypto from "node:crypto"
import { writeFile } from "node:fs"

// logguer -> un sistema que registra las peticiones
const loginUser = async (email: string, pass: string) => {
  const userEmail = "gabi@gmail.com"
  const userPass = "pepe123"

  const data = await fileSystem.readFile("./log/user.json", "utf8")
  // al array de loguers de users
  const logUsers = JSON.parse(data)

  if (email === userEmail && pass === userPass) {
    const newLog = createLog(true, email)
    logUsers.push(newLog)
    registerLog(logUsers)
    const response = "Usuario Logueado con éxito"
    console.log(response)
  } else {
    const newLog = createLog(false, email)
    logUsers.push(newLog)
    // registrar log
    registerLog(logUsers)
    const response = "Usuario denegado"
    console.log(response)
  }
}

const registerLog = async (logUsers: []) => {
  writeFile("./log/user.json", JSON.stringify(logUsers), (err) => {
    if (err) {
      console.log(err)
    }
  })
}

const createLog = (stateSuccess: boolean, email: string) => {
  return {
    id: crypto.randomUUID(),
    success: stateSuccess,
    timestamp: new Date().toLocaleString(),
    userName: email
  }
}

loginUser(process.argv[2], process.argv[3])