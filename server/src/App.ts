import usersRoute from './api/users'
const express = require('express')

class App {
  public express

  constructor() {
    this.express = express()
    this.mountMiddleware()
    this.mountRoutes()
  }

  private mountMiddleware(): void {
    this.express.use(express.json())
  }

  private mountRoutes(): void {
    this.express.use('/api/users', usersRoute)
  }
}

export default new App().express
