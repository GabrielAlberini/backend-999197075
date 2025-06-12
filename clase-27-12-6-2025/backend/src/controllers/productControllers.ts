import { Request, Response } from "express"
import { Product } from "../models/productModel"
import { email, success } from "zod/v4"

const getAllProducts = async (req: Request, res: Response): Promise<any> => {
  try {
    const products = await Product.find()
    res.json({
      success: true,
      message: "recuperar todos los productos",
      data: products
    })
  } catch (error) {
    const err = error as Error
    res.status(500).json({ success: false, message: err.message })
  }
}

const createProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const body = req.body

    const { name, price, category } = body

    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "bad request, invalid data"
      })
    }

    const newProduct = new Product({ name, price, category })
    await newProduct.save()

    res.status(201).json({
      success: true,
      messaje: "Successfully created product",
      data: newProduct
    })
  } catch (error) {
    const err = error as Error
    res.status(500).json({ success: false, message: err.message })
  }
}

export { getAllProducts, createProduct }