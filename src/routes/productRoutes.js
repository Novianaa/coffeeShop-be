const express = require('express')
const router = express.Router()
const { addProduct, getAllProductByCategory, getAllProduct, detailProduct } = require('../controllers/productController')
const { isLogin, isAdmin } = require('../middleware/verifyAuth')
const uploadImage = require('../middleware/uploadImageProduct')

router.post('/', isLogin, isAdmin, uploadImage, addProduct)
router.get('/', isLogin, getAllProduct)
router.get('/:category_id', getAllProductByCategory)
router.get('/detail/:slug', isLogin, detailProduct)



module.exports = router