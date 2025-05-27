// index.ts
import express, { Request, Response } from 'express'
import mongoose, { Schema, model } from 'mongoose'

const app = express()
const PORT = 3000
const MONGO_URI = 'mongodb://127.0.0.1:27017/productos'

app.use(express.json())

// Conexión a la base de datos
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(() => console.error('❌ Error al conectar a MongoDB'))

// Schema y modelo
const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 }
}, { versionKey: false })

const Product = model('Product', productSchema)

// Endpoints CRUD
app.get('/api/products', async (_req: Request, res: Response) => {
  const products = await Product.find()
  res.json({ success: true, data: products })
})

app.post('/api/products', async (req: Request, res: Response) => {
  try {
    const newProduct = await Product.create(req.body)
    res.status(201).json({ success: true, data: newProduct })
  } catch (error) {
    res.status(400).json({ success: false, error: 'Datos inválidos' })
  }
})

app.put('/api/products/:id', async (req: Request, res: Response) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updated) return res.status(404).json({ success: false, error: 'Producto no encontrado' })
    res.json({ success: true, data: updated })
  } catch (error) {
    res.status(400).json({ success: false, error: 'Datos inválidos' })
  }
})

app.delete('/api/products/:id', async (req: Request, res: Response) => {
  const deleted = await Product.findByIdAndDelete(req.params.id)
  if (!deleted) return res.status(404).json({ success: false, error: 'Producto no encontrado' })
  res.json({ success: true, message: 'Producto eliminado' })
})

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`)
})
