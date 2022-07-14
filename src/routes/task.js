const { Router } = require('express')
const { verifyToken } = require('../middlewares/verifyToken')
const { getTasks, createTask } = require('../controllers/task')

const router = Router()

// Show tasks
router.get('/getTasks', getTasks)

// Create task
router.post('/add-task',verifyToken, createTask)

module.exports = router
