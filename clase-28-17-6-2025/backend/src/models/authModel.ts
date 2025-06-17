import { Schema, model } from "mongoose";

const authSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  versionKey: false
})

const Auth = model("Auth", authSchema)

export { Auth }