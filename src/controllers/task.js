const { response } = require('express')
const Task = require('../models/task.model')
const User = require('../models/user.model')

const getTasks = async (req, res) => {
  const { userId } = req.query
  console.log(userId)
  const user = await User.findById(userId).populate('tasks', {
    _id: 1,
    title: 1,
    notes: 1,
    complete: 1
  })

  if (!user.tasks.length) {
    return res.status(200).send({ status: 200, data: 'Sin datos para mostrar' })
  } else {
    return res.status(200).send({ status: 200, data: user.tasks })
  }
}

const createTask = async (req, res = response, next) => {
  const { title, notes, start, end, userId } = req.body
  const missingFields = req.body

  const user = await User.findById(userId)
  if (!title || !start || !end) {
    return res.status(400).send({
      status: 400,
      message: 'Valida los datos solicitados.',
      data: { message: 'Validar campos', data: missingFields }
    })
  }

  const userFromTask = await User.findById(userId).select('user email')
  const newTask = new Task({
    title,
    notes,
    start,
    end,
    complete: false,
    user: userFromTask
  })

  try {
    const savedTask = await newTask.save()
    user.tasks = user.tasks.concat(savedTask)
    await user.save()
    return res
      .status(200)
      .send({ status: 200, message: 'Tarea creada con éxito.', task: newTask })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getTasks,
  createTask
}
