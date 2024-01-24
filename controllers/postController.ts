import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getAllPosts = async(req:Request, res:Response) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true
      }
    })

    return res.status(200).send({
      success: true,
      message: 'get all users success',
      data: posts
    })
  } catch(err) {
    return res.status(500).send({
      success: false,
      message: JSON.stringify(err)
    })
  }
}

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, body, userId } = req.body

    if (title == "" || body == "" || userId == 0) {
      return res.status(400).send({
        success: false,
        message: 'request error',
        data: {}
      })
    }

    const post = await prisma.post.create({
      data: {
        title: title,
        body: body,
        userId: userId
      }
    })

    return res.status(200).send({
      success: true,
      message: 'create posts success',
      data: post
    })
  } catch(err) {
    return res.status(500).send({
      success: false,
      message: err
    })
  }
};
