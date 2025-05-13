import { connect } from "mongoose"
process.loadEnvFile()

const URI_DB = process.env.URI_DB || ""

const connectMongodb = async () => {
  try {
    await connect(URI_DB)
    console.log("Conectado a mongodb con éxito")
  } catch (error) {
    console.log("Error al conectarnos a la base de datos")
  }
}

export { connectMongodb }