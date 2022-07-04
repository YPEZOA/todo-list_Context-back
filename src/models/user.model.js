const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  email: String,
  user: String,
  password: String,
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
})

module.exports = model('User', userSchema)
