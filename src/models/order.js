const db = require('../helpers/mysql')

module.exports = {
  checkout: (setData) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO order_product SET ?`, setData, (err, result) => {
        if (err) {
          reject(new Error(`${err.message}`))
        }
        resolve({ id: result.insertId, ...setData })
      })
    })
  }
}