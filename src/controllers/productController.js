const Product = require('../models/product')
const helperWrapper = require('../helpers/wrapperHelper')
const slugify = require('slugify')

module.exports = {
  addProduct: async (req, res) => {
    try {
      let { name, price, description, category_id, photo } = req.body
      photo = req.file ? req.file.filename : 'http://bppl.kkp.go.id/uploads/publikasi/karya_tulis_ilmiah/default.jpg'
      if (!name || !price || !description || !category_id || !photo) {
        return helperWrapper.response(res, false, 404, `ERROR: Fields must be filled `)
      }
      const slug = slugify(name)
      const setData = { name, price, description, category_id, photo, slug }
      const results = await Product.addProduct(setData)
      return helperWrapper.response(res, true, 200, 'Success add new menu', results)
    } catch (err) {
      return helperWrapper.response(res, false, 404, `ERROR: ${err.message}`)
    }
  },
  getAllProductByCategory: async (req, res) => {
    try {
      const { category_id } = req.params
      const result = await Product.getAllMenuByCategory(category_id)
      return helperWrapper.response(res, true, 200, 'Success show product', result)
    } catch (err) {
      return helperWrapper.response(res, false, 404, `ERROR: ${err.message}`)

    }
  },
  getAllProduct: async (req, res) => {
    try {
      const result = await Product.getAllMenu()
      return helperWrapper.response(res, true, 200, 'Success show product', result)
    } catch (err) {
      return helperWrapper.response(res, false, 404, `ERROR: ${err.message}`)
    }
  },
  detailProduct: async (req, res) => {
    try {
      const { slug } = req.params
      const result = await Product.detailProduct(slug)
      return helperWrapper.response(res, true, 200, 'Success show product', result)
    } catch (err) {
      return helperWrapper.response(res, false, 404, `ERROR: ${err.message}`)
    }
  }
}