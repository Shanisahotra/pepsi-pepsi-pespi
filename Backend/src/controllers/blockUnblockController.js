import prisma from "../utils/prismaClient.js";

export const blockUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { isBlocked: true },
    });

    res.json({
      message: "User blocked successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};


export const unblockUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { isBlocked: false },
    });

    res.json({
      message: "User unblocked successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};