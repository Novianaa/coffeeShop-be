const helperWrapper = require('../helpers/wrapperHelper')
const User = require('../models/users')
const slugify = require('slugify')

module.exports = {
  getUser: async (req, res) => {
    try {
      let { email } = req.params
      // email = req.decodeToken.email
      if (email !== req.decodeToken.email) {
        return helperWrapper.response(res, false, 404, `ERROR: email must been same`)
      }
      console.log(req.decodeToken.email)
      const result = await User.getUser(email)
      return helperWrapper.response(res, true, 200, 'Success show detail profile', result)
    } catch (err) {
      return helperWrapper.response(res, false, 404, `ERROR: ${err.message}`)
    }
  },
}