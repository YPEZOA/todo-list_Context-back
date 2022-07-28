// Crear este archivo en una carpeta
const mongoose = require('mongoose')

const dbConnection = async () => {
  try {
    mongoose.connect(process.env.MONGODB_CNN, {
      useUnifiedTopology: true
    })
    console.log('DD.BB Connected')
  } catch (e) {
    /* handle error */
    console.log(e)
    throw new Error('Error by dataBase')
  }
}

module.exports = {
  dbConnection
}
