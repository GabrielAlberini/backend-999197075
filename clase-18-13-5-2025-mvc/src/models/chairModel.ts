import { Schema, model } from "mongoose"

const chairSchema = new Schema({
  name: { type: String, required: true, unique: true },
  material: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true, min: 0 }
}, {
  versionKey: false
})

const Chair = model("Chair", chairSchema)

export { Chair }