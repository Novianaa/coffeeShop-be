const Order = require('../models/order')
const Product = require('../models/product')
const helperWrapper = require('../helpers/wrapperHelper')

module.exports = {
  checkout: async (req, res) => {
    try {
      let { user_id, slug, sub_total, total, qty, tax, invoice, price } = req.body
      user_id = req.decodeToken.user_id
      invoice = 'CS-' + Math.random().toString(36).substr(2, 9).toUpperCase()
      if (qty < 1) {
        return helperWrapper.response(res, false, 404, `ERROR: Order empty`)
      }
      const setData = { user_id, slug, qty, sub_total, total, tax, invoice }
      const result = await Order.checkout(setData)
      return helperWrapper.response(res, true, 201, 'success checkout', result)
    } catch (err) {
      return helperWrapper.response(res, false, 404, `ERROR: ${err.message}`)
    }
  },
}