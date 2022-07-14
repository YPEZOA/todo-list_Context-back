const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]

  if(!req.headers.authorization) {
    return res.status(401).send({
      status: 401,
      message: 'Unauthorized request'
    })
  }

  if(token === 'null') {
    return res.status(401).send({
      status: 401,
      message: 'Unauthorized request'
    })
  }

  const payload = jwt.verify(token, 'secretkey')

  req.userId = payload._id
  next()

}

module.exports = {
  verifyToken
}
