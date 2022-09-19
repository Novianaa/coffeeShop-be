const express = require('express')
const router = express.Router()
const { isLogin, isAdmin } = require('../middleware/verifyAuth')
const { checkout } = require('../controllers/orderController')

router.post('/', isLogin, checkout)

module.exports = router