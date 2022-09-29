const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const Auth = require('../models/auth')
const helperWrapper = require('../helpers/wrapperHelper')
const sendMail = require("../helpers/email")

module.exports = {
  register: async (req, res) => {
    try {
      let { id, email, password, no_phone, role } = req.body
      if (role) {
        return helperWrapper.response(res, false, 404, "ERROR: can't input role")
      }
      if (password.length < 8) {
        return helperWrapper.response(res, false, 404, 'ERROR: password must more than 8 characters')
      }
      if (!email || !password || !no_phone) {
        return helperWrapper.response(res, false, 404, 'ERROR: Fields must be filled')
      }
      const photo = req.file ? req.file.filename : 'https://divedigital.id/wp-content/uploads/2021/10/1-min.png'
      // console.log(id, 'jkjkrs')
      const setData = { email, password, no_phone, photo }
      const result = await Auth.register(setData, id)
      const setDataEmail = {
        to: email,
        subject: "Email Verification !",
        template: "email-verification",
        data: {
          url: `http://localhost:3001/api/v1/auth/activation/${result.id}`,
          email: email,
        }
      }
      await sendMail(setDataEmail)
      return helperWrapper.response(res, true, 201, 'Success register, please check email to verify acount', result)
    } catch (err) {
      return helperWrapper.response(res, false, 404, `ERROR: ${err.message}`)
    }
  },
  activation: async (req, res) => {
    try {
      let { id } = req.params
      let updateStatus = Auth.activation(id)
      return helperWrapper.response(res, true, 200, 'success activation', null)
    }
    catch (err) {
      return helperWrapper.response(res, false, 400, `ERROR: Bad Request ${error.message}, null`)
    }
  },
  login: async (req, res) => {
    try {
      let { email, password } = req.body
      if (!email || !password) {
        return helperWrapper.response(res, false, 404, 'ERROR: Fields must be filled')
      }
      email = email.toLowerCase()
      const result = await Auth.login(email, password)
      if (result.length < 1) {
        return helperWrapper.response(res, false, 404, 'ERROR: Wrong Email / Password')
      }
      if ((await bcrypt.compare(password, result[0].password)) == false) {
        return helperWrapper.response(res, false, 400, "ERROR: Wrong Email / Password");
      }
      const token = jwt.sign({ user_id: result[0].id, role: result[0].role, email: result[0].email }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1 day'
      })
      return helperWrapper.response(res, true, 200, 'Success login', {
        user_id: result[0].id,
        token,
        photo: result[0].photo,
        role: result[0].role,
        email: result[0].email
      })

    } catch (err) {
      return helperWrapper.response(res, false, 404, `ERROR: Bad request ${err.message}`)
    }
  }
}