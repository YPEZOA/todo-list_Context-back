const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.port = process.env.PORT;
    this.app = express();
  }

  middlewares() {
    this.app.use(cors());
    // Parseo para lectura del body
    this.app.use(express.json());
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server run in", this.port);
    });
  }
}

module.exports = Server;
