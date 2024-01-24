import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getAllUsers = async(req:Request, res:Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        post: true
      }
    })

    return res.status(200).send({
      success: true,
      message: 'get all users success',
      data: users
    })
  } catch(err) {
    return res.status(500).send({
      success: false,
      message: JSON.stringify(err)
    })
  }
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    if (name == "" || email == "" || password == "") {
      return res.status(400).send({
        success: false,
        message: 'request error',
        data: {}
      })
    }

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password
      }
    })

    return res.status(200).send({
      success: true,
      message: 'create users success',
      data: user
    })
  } catch(err) {
    return res.status(500).send({
      success: false,
      message: JSON.stringify(err)
    })
  }
};
