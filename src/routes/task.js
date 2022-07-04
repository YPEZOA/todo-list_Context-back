const { Router } = require('express')
const { getTasks, createTask } = require('../controllers/task')

const router = Router()

// Show tasks
router.get('/', getTasks)

// Create task
router.post('/add-task', createTask)

module.exports = router
