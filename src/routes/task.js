const { Router } = require('express')
const { verifyToken } = require('../middlewares/verifyToken')
const { getTasks, createTask, updateTask } = require('../controllers/task')

const router = Router()

// Show tasks
router.get('/', getTasks)

// Create task
router.post('/add-task', verifyToken, createTask)

// Update task
router.put('/updateTask/:id', verifyToken, updateTask)

module.exports = router
