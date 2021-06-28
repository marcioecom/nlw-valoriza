import "reflect-metadata"
import express, { Request, Response, NextFunction } from 'express'
import "express-async-errors"
import "dotenv/config"

import { router } from './routes'

import "./database"

const app = express()
const port = process.env.PORT

app.use(express.json())

app.use(router)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message
    })
  }

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error"
  })
})

app.listen(port, () => console.log(`Server running on localhost:${port}`))
