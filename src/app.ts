/* eslint-disable space-before-function-paren */
import * as dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import routes from './routers'
import cors from 'cors'

dotenv.config()

class App {
  private express: express.Application;

  public constructor() {
    this.express = express()
    this.middlewares()
    this.database()
  }

  private middlewares(): void {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(routes)
  }

  private database(): void {
    try {
      mongoose.connect(process.env.MONGO_URL_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    } catch (error) {
      console.log('err mongodb', error)
    }
  }

  public getAll() {
    return this.express
  }
}

export default new App().getAll()
