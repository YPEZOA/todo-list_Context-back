const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

const login = async (req, res, next) => {
  const { user, password } = req.body;
  const findUser = await User.findOne({user});
  if(!findUser) return res.status(400).send({status: 400, message: 'Usuario no encontrado'})
  if(findUser.password !== password) return res.status(400).send({status: 400, message: 'Contraseña incorrecta.'})
  console.log(findUser);

  const userData = await User.findOne({user}).select('_id user email');

  try {
    const token = jwt.sign({_id: findUser._id}, 'secretkey')
    return res.status(200).send({status: 200, user: userData, token})
  } catch (e) {
    /* handle error */
    console.error(e);
    next()
  }
}

const getUser = async (req, res) => {
  const { id } = req.query
  const user = await User.findById(id).select('user email').populate('tasks',{
    _id:1,
    title: 1,
    notes:1,
    start:1,
    end:1,
    complete:1
  })

  if(id) res.status(200).send({status: 200, data: user})
}

const createUser = async (req, res, next) => {
  const { email, userName, password } = req.body
  const newUser = new User({
    email,
    user: userName,
    password,
    tasks: []
  })

  if(!email || !userName || !password) {
    return res.status(400).send({status: 400, message: "Valida los datos solicitados", response: req.body})
  }

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
  createUser,
  login,
  getUser
}
