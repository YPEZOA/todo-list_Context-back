const { Router } = require('express')
const { createUser } = require('../controllers/user')

const router = Router()

// User register
router.post('/register', createUser)

// Login
router.get('/login')

// Logout
router.get('/logout')

module.exports = router
