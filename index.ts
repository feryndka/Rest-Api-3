import express, { Application, Request, Response } from "express"

const app : Application = express()
app.use(express.json()) // Body Parser