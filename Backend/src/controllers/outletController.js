import prisma from "../utils/prismaClient.js";

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
    const outlets = await prisma.outlet.findMany({
      orderBy: { id: "desc" },
    });

    res.json({
      message: "Outlets fetched successfully",
      outlets,
    });
  } catch (error) {
    next(error);
  }
};

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