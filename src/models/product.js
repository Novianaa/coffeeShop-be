const db = require('../helpers/mysql')

module.exports = {
  addProduct: (setData) => {
    return new Promise((resolve, reject) => {
      const dbQuery = db.query('INSERT INTO product SET ?', setData, (err, results) => {
        if (err) {
          reject(new Error(`${err.sqlMessage}`))
        }
        resolve(setData)
      })
    })
  },
  getAllMenuByCategory: (category_id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT p.name, p.slug,p.price,p.description,c.name as category_name,p.photo FROM product p JOIN category c ON p.category_id=c.id WHERE c.name=?`, category_id, (err, result) => {
        if (err) {
          reject(new Error(`${err.sqlMessage}`))
        }
        resolve(result)
      })
    })
  },
  getAllMenu: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT p.name, p.slug,p.price,p.description,c.name as category_name,p.photo FROM product p JOIN category c ON p.category_id=c.id`, (err, result) => {
        if (err) {
          reject(new Error(`${err.sqlMessage}`))
        }
        resolve(result)
      })
    })
  },
  detailProduct: (slug) => {
    return new Promise((resolve, reject) => {
      const dbQuery = db.query(`SELECT p.name, p.slug,p.price,p.description,c.name as category_name,p.photo FROM product p JOIN category c ON p.category_id=c.id WHERE slug='${slug}'`, (err, result) => {
        if (err) {
          reject(new Error(`${err.sqlMessage}`))
        }
        resolve(result)
      })
      console.log(dbQuery.sql)
    })

  }
}