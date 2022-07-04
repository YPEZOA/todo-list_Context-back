const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

const createUser = async (req, res, next) => {
  const { email, userName, password } = req.body
  const newUser = new User({
    email,
    user: userName,
    password,
    tasks: []
  })

  // Validate if email exist
  const user = await User.findOne({ email })
  if (user) {
    return res
      .status(400)
      .send({ status: 400, message: 'Email de usuario ya existe' })
  }

  try {
    await newUser.save()
    const token = jwt.sign({ _id: newUser._id }, 'secretkey')

    return res.status(200).send({
      message: 'Registro de usuario exitoso',
      data: newUser,
      token
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createUser
}
