const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database')

class Server {
  constructor() {
    this.port = process.env.PORT
    this.app = express()
    this.paths = {
      tasks: '/api/tasks',
      user: '/api/user'
    }
    this.middlewares()
    this.dbConnect()
    this.routes()
  }

  async dbConnect() {
    await dbConnection()
  }

  middlewares() {
    this.app.use(cors())
    // Parseo para lectura del body
    this.app.use(express.json())
  }

  routes() {
    this.app.use(this.paths.tasks, require('../routes/task'))
    this.app.use(this.paths.user, require('../routes/user'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server run in', this.port)
    })
  }
}

module.exports = Server
