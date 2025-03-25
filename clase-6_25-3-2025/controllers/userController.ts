// fs -> file system
// fs esta exportado por defecto
import fs from "node:fs/promises"

export const readData = async () => {
  try {
    const data = await fs.readFile("./data/users.json", "utf-8")
    const users = JSON.parse(data)
    return users
  } catch (error: any) {
    console.log("Error al leer la data...")
  }
}

export const writeData = async (data: any) => {
  await fs.writeFile("./data/users.json", JSON.stringify(data), "utf-8")
}
