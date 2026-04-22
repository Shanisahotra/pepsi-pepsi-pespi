import prisma from "../utils/prismaClient.js";

export const createProduct = async (req, res, next) => {
  try {
    const { name, price } = req.body

    const existing = await prisma.product.findUnique({
      where: { name },
    })

    if (existing) {
      return res.status(400).json({
        message: "Product already exists",
      })
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),
      },
    })

    res.status(201).json({
      message: "Product created",
      product,
    })
  } catch (error) {
    next(error)
  }
}


export const getAllProducts = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: "desc" },
    })

    res.json({
      message: "Products fetched",
      products,
    })
  } catch (error) {
    next(error)
  }
}


export const getSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params

    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    })

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      })
    }

    res.json({
      product,
    })
  } catch (error) {
    next(error)
  }
}


export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, price } = req.body

    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        price: Number(price),
      },
    })

    res.json({
      message: "Product updated",
      product,
    })
  } catch (error) {
    next(error)
  }
}


export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params

    await prisma.product.delete({
      where: { id: Number(id) },
    })

    res.json({
      message: "Product deleted",
    })
  } catch (error) {
    next(error)
  }
}