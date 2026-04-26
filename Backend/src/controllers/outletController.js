import prisma from "../utils/prismaClient.js";
import redisClient from "../config/redis.js";

// CREATE OUTLET
 export const createOutlet = async (req, res, next) => {
  try {
    const { name, owner, email, phone, address } = req.body;

    const outlet = await prisma.outlet.create({
      data: {
        name,
        owner,
        email,
        phone,
        address,
      },
    });

    res.status(201).json({
      message: "Outlet created successfully",
      outlet,
    });
  } catch (error) {
    next(error);
  }
};

//GET ALL OUTLETS
export const getAllOutlets = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 5

    const skip = (page - 1) * limit

    // Unique Redis cache key
    const cacheKey = `outlets:page:${page}:limit:${limit}`

    // 1. Check Redis Cache
    const cachedOutlets = await redisClient.get(cacheKey)

    if (cachedOutlets) {
      return res.json({
        message: "Outlets fetched from Redis cache",
        ...JSON.parse(cachedOutlets),
      })
    }

    // 2. Fetch from Database
    const outlets = await prisma.outlet.findMany({
      skip,
      take: limit,
      orderBy: {
        id: "desc",
      },
    })

    const totalOutlets = await prisma.outlet.count()

    const responseData = {
      outlets,
      totalOutlets,
      totalPages: Math.ceil(totalOutlets / limit),
      currentPage: page,
    }

    // 3. Store in Redis for 60 sec
    await redisClient.setEx(
      cacheKey,
      60,
      JSON.stringify(responseData)
    )

    res.json({
      message: "Outlets fetched successfully",
      ...responseData,
    })

  } catch (error) {
    next(error)
  }
}

export const searchOutlets = async (req, res, next) => {
  try {
    const { query = "" } = req.query

    const OR = [
      {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      {
        owner: {
          contains: query,
          mode: "insensitive",
        },
      },

      {
        email: {
          contains: query,
          mode: "insensitive",
        },
      },

      {
        phone: {
          contains: query,
          mode: "insensitive",
        },
      },

      {
        address: {
          contains: query,
          mode: "insensitive",
        },
      },
    ]



    const users = await prisma.outlet.findMany({
      where: { OR },
      orderBy: { id: "desc" },
    })

    res.json({
      message: "Search results",
      users,
    })
  } catch (error) {
    next(error)
  }
}



/**
 * GET SINGLE OUTLET
 */
export const getOutletById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const outlet = await prisma.outlet.findUnique({
      where: { id: Number(id) },
    });

    if (!outlet) {
      return res.status(404).json({ message: "Outlet not found" });
    }

    res.json({ outlet });
  } catch (error) {
    next(error);
  }
};

/**
 * UPDATE OUTLET
 */
export const updateOutlet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, owner, email, phone, address } = req.body;

    const outlet = await prisma.outlet.update({
      where: { id: Number(id) },
      data: {
        name,
        owner,
        email,
        phone,
        address,
      },
    });

    res.json({
      message: "Outlet updated successfully",
      outlet,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE OUTLET
 */
export const deleteOutlet = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.outlet.delete({
      where: { id: Number(id) },
    });

    res.json({
      message: "Outlet deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};