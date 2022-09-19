const express = require('express')
const router = express.Router()
const { register, activation, login } = require('../controllers/authController')

router.post('/register', register)
router.post('/login', login)
router.get('/activation/:id', activation)

module.exports = router