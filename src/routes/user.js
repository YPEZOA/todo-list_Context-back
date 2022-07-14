const { Router } = require('express')
const { createUser, login, getUser } = require('../controllers/user')

const router = Router()

// User register
router.post('/register', createUser)

// Login
router.post('/login', login)

// Get user data
router.get('/getUser', getUser)

// Logout
router.get('/logout')

module.exports = router
