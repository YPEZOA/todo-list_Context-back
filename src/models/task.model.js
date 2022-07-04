const { Schema, model } = require('mongoose')

const taskSchema = new Schema(
  {
    title: String,
    notes: String,
    complete: Boolean,
    start: Date,
    end: Date,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
)

const Task = model('Task', taskSchema)

module.exports = Task
