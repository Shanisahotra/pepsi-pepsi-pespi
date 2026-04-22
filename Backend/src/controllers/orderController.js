import prisma from "../utils/prismaClient.js"

// CREATE ORDER
export const createOrder = async (req, res, next) => {
  try {
    const { outletId, discount = 0, items } = req.body

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Products required",
      })
    }

    const outlet = await prisma.outlet.findUnique({
      where: { id: Number(outletId) },
    })

    if (!outlet) {
      return res.status(404).json({
        message: "Outlet not found",
      })
    }

    let subtotal = 0
    const orderItems = []

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: Number(item.productId) },
      })

      if (!product) continue

      const total = product.price * item.quantity
      subtotal += total

      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
        total,
      })
    }

    const grandTotal = subtotal - discount

    const order = await prisma.order.create({
      data: {
        outletId: Number(outletId),
        subtotal,
        discount,
        total: grandTotal,

        items: {
          create: orderItems,
        },
      },

      include: {
        outlet: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    res.json({
      message: "Order created successfully",
      order,
    })

  } catch (error) {
    next(error)
  }
}


// GET ALL ORDERS
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        id: "desc",
      },

      include: {
        outlet: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    res.json({
      message: "Orders fetched successfully",
      orders,
    })

  } catch (error) {
    next(error)
  }
}


// GET SINGLE ORDER
export const getSingleOrder = async (req, res, next) => {
  try {
    const { id } = req.params

    const order = await prisma.order.findUnique({
      where: { id: Number(id) },

      include: {
        outlet: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      })
    }

    res.json({
      order,
    })

  } catch (error) {
    next(error)
  }
}


// DELETE ORDER
export const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params

    await prisma.order.delete({
      where: { id: Number(id) },
    })

    res.json({
      message: "Order deleted successfully",
    })

  } catch (error) {
    next(error)
  }
}