import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createManager = async (req: Request, res: Response) => {
  const transactionResult = await prisma.$transaction(async(prisma) => {
    try {
      const manager = await prisma.manager.create({
        data: req.body,
      });
      return res.status(201).send({
        success: true,
        message: "Create manager success",
        data: manager,
      });
    } catch (error) {
      console.error("Transaction error:", error);
      throw error;
    }
  })
};

export const getManager = async (req: Request, res: Response) => {
  try {
    const manager = await prisma.manager.findMany({
      include: {
        branch: true
      }
    })

    return res.status(200).send({
      success: true,
      message: 'Get all manager success',
      data: manager
    })
  } catch(err) {
    return res.status(500).send({
      success: false,
      message: JSON.stringify(err)
    })
  }
};

export const updateManager = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const manager = await prisma.manager.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.status(201).send({
      success: true,
      message: "Update data success",
      data: manager,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteManager = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const manager = await prisma.manager.delete({
      where: { id: parseInt(id) },
    });
    res.status(201).send({
      success: true,
      message: "Delete data success",
      data: manager,
    });
  } catch (error) {
    console.log(error);
  }
};
