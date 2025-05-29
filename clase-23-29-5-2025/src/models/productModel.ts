import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, default: 0 },
  category: { type: String, default: "Sin categoria", enum: ["living", "jardineria", "dormitorio", "sala de juegos"] }
}, {
  versionKey: false
})

const Product = model("Product", productSchema)

export { Product }