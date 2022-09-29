const db = require('../helpers/mysql')

module.exports = {
  checkout: (setData) => {
    return new Promise((resolve, reject) => {
      const dbQuery = db.query(`INSERT INTO order_product SET ?`, setData, (err, result) => {
        if (err) {
          reject(new Error(`${err.message}`))
        }
        // const id = result.insertId
        resolve({ id: result.insertId, ...setData })
      })
      console.log(dbQuery.sql)
    })
  },
  // updateCheckout: (setData) => {
  //   return new Promise((resolve, reject) => {
  //     const dbQuery = db.query(`UPDATE order_product SET ? WHERE id=?`, [setData, id], (err, result) => {
  //       if (err) {
  //         reject(new Error(`${err.message}`))
  //       }
  //       // const id = result.insertId
  //       resolve({ ...setData })
  //     })
  //   })
  // }
  getOrder: (id) => {
    return new Promise((resolve, reject) => {
      const dbQuery = db.query(`SELECT * FROM order_product WHERE id=?`, id, (err, result) => {
        if (err) {
          reject(new Error(`${err.message}`))
        }
        resolve(result)
      })
      console.log(dbQuery.sql)
    })
  }
}