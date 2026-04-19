import prisma from "../utils/prismaClient.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

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
    const users = await prisma.user.findMany({
      orderBy: {
        id: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })

    res.json({
      message: "Users fetched successfully",
      users,
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