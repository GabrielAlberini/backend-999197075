import { connect } from "mongoose"
process.loadEnvFile()

const URI_DB = process.env.URI_DB || ""

const connectMongoDb = async () => {
  try {
    await connect(URI_DB)
    console.log(`✅ Conectado a MongoDB con éxito`)
  } catch (error) {
    console.log(`🚫 Error al conectarse a MongoDB`)
  }
}

export { connectMongoDb }