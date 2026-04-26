import prisma from "../utils/prismaClient.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import redisClient from "../config/redis.js";

// REGISTER
export const register= async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role
      },
    });

    res.json({ message: "User registered", user });
  } catch (error) {
    next(error);
  }
};


export const getAllUsers = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 5

    const skip = (page - 1) * limit

    // unique cache key for each page + limit
    const cacheKey = `users:page:${page}:limit:${limit}`

    // 1. Check Redis first
    const cachedUsers = await redisClient.get(cacheKey)

    if (cachedUsers) {
      return res.json({
        message: "Users fetched from Redis cache",
        ...JSON.parse(cachedUsers),
      })
    }

    // 2. If no cache, fetch DB
    const users = await prisma.user.findMany({
      skip,
      take: limit,
      orderBy: {
        id: "desc",
      },
    
    })

    const totalUsers = await prisma.user.count()

    const responseData = {
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    }

    // 3. Store in Redis for 60 seconds
    await redisClient.setEx(
      cacheKey,
      60,
      JSON.stringify(responseData)
    )

    res.json({
      message: "Users fetched successfully",
      ...responseData,
    })

  } catch (error) {
    next(error)
  }
}

// UPDATE USER
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, email, password, role } = req.body

    const existingUser = await prisma.user.findUnique({
      where: { id: Number(id) },
    })

    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
      })
    }

    let hashedPassword = existingUser.password

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10)
    }

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    })

    res.json({
      message: "User updated successfully",
      user,
    })
  } catch (error) {
    next(error)
  }
}



// DELETE USER
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params

    const existingUser = await prisma.user.findUnique({
      where: { id: Number(id) },
    })

    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
      })
    }

    await prisma.user.delete({
      where: { id: Number(id) },
    })

    res.json({
      message: "User deleted successfully",
    })
  } catch (error) {
    next(error)
  }
}

export const searchUsers = async (req, res, next) => {
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
        email: {
          contains: query,
          mode: "insensitive",
        },
      },
    ]

    if (query.toLowerCase() === "admin") {
      OR.push({ role: "Admin" })
    }

    if (query.toLowerCase() === "user") {
      OR.push({ role: "User" })
    }

    const users = await prisma.user.findMany({
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


// LOGIN
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

      //BLOCK CHECK HERE
    if (user.isBlocked) {
      return res.status(403).json({
        message: "Your account is blocked. Contact admin.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

   const token = generateToken(user.id, user.role);

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    next(error);
  }
};


