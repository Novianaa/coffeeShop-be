const express = require('express')
const router = express.Router()
const { getUser } = require('../controllers/userController')
const { isLogin, isAdmin } = require('../middleware/verifyAuth')
const uploadImage = require('../middleware/uploadImageProduct')

router.get('/:email', isLogin, getUser)




module.exports = router