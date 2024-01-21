import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

const prisma = new PrismaClient()

export const createBranch = async(req:Request, res:Response) => {
  try {
    const branch = await prisma.branch.create({
      data: req.body
    })
    res.status(201).send({
      success: true,
      message: 'Create branch success'
    })
  } catch(error) {
    console.log(error)
  }
}

export const getBranch = async(req:Request, res:Response) => {
  try {
    interface IFilterQuery {
      id?: number;
      name?: string;
    }

    const { id, name } = req.query;
    const filterData: IFilterQuery = {};

    if (id) {
      filterData.id = parseInt(id as string)
    }
    if (name) {
      filterData.name = name as string
    }

    // const branch = await prisma.branch.findMany({
    //   where: {
    //     name: {
    //       contains: filterData.name // filtering seperti like pada query sql '%jkt%'
    //     },
    //     id: filterData.id
    //   }
    // })

    const branch = await prisma.branch.findMany({
      where: {
        // AND, OR, NOT = for multiple condition
        AND: [
          {
            location: {
              // not = for single condition
              not: {
                //contains, startsWith, endsWith
                contains: 'bau',
              },
            },
            name: {
              // in, notIn
              notIn: ['Purwadhika JKT', 'Purwadhika BDG']
            }
          }
        ],
        createdAt: {
          // gt  (>) greater than
          // lt  (<) lower than
          // gte (>=) greater than equal
          // lte (<=) lower than equal
          gte: new Date('2024-01-21')
        }
      }
    })
    
    res.status(201).send({
      success: true,
      message: 'Get branch success',
      data: branch
    })
  } catch(error) {
    console.log(error)
  }
}

export const getBranchDetail = async(req:Request, res:Response) => {
  try {
    const branch = await prisma.branch.findUnique({
      where: {
        id: parseInt(req.params.id)
      }
    })
    
    res.status(201).send({
      success: true,
      message: 'Get branch detail success',
      data: branch
    })
  } catch(error) {
    console.log(error)
  }
}