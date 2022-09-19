const db = require('../helpers/mysql')

module.exports = {
  getUser: (email) => {
    return new Promise((resolve, reject) => {
      const dbQuery = db.query('SELECT * from users WHERE email=?', email, (err, results) => {
        if (err) {
          reject(new Error(`${err.sqlMessage}`))
        }
        resolve({
          results
        })
      })
    })
  }
}