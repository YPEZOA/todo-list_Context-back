const { response } = require('express')
const Task = require('../models/task.model')
const User = require('../models/user.model')

const getTasks = async (req, res = response) => {
  const { userId } = req.body
  const user = await User.findById(userId)
  const task = await Task.findById(user.id)
    .select('title notes start end complete')
    .populate('user', {
      title: 1,
      notes: 1,
      start: 1,
      end: 1,
      complete: 1
    })

  if (!task) {
    return res
      .status(200)
      .send({ status: 200, data: 'Sin datos para mostrar.' })
  } else {
    return res.status(200).send({ status: 200, data: task })
  }
}

const createTask = async (req, res = response, next) => {
  const { title, notes, start, end } = req.body
  const missingFields = req.body
  if (!title || !start || !end) {
    return res.status(400).send({
      status: 400,
      message: 'Valida los datos solicitados.',
      data: { message: 'Validar campos', datos: missingFields }
    })
  }
  const newTask = new Task({
    title,
    notes,
    start,
    end,
    complete: false
  })

  try {
    await newTask.save()
    return res.status(200).send({ status: 200, newTask: req.body })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getTasks,
  createTask
}
