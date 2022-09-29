const express = require('express')
const router = express.Router()
const { isLogin, isAdmin } = require('../middleware/verifyAuth')
const { checkout, getOrder } = require('../controllers/orderController')

router.post('/', isLogin, checkout)
router.get('/:id', isLogin, getOrder)

module.exports = router