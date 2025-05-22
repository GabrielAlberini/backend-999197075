import { connect } from "mongoose";
import dotenv from "dotenv"

process.env.DEV_MODE === "production" ? dotenv.config() : process.loadEnvFile()

const URI_DB = process.env.DEV_MODE === "production"
  ? process.env.URI_DB
  : "mongodb://localhost:27017/";

const connectMongoDb = async () => {
  try {
    if (!URI_DB) {
      console.log("Database URI is not defined.")
    }
    if (URI_DB) {
      await connect(URI_DB);
    }
    console.log("✅ Conectado a MongoDB con éxito");
  } catch (error: any) {
    console.error("🚫 Error al conectarse a MongoDB:", error.message);
  }
};

export { connectMongoDb };
