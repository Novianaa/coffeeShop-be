const db = require('../helpers/mysql')
const bcrypt = require('bcrypt')

module.exports = {
  register: (setData, id) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(setData.password, 10, (err, hashed) => {
        if (err) {
          reject(`${err.sqlMessage}`)
        }
        else {
          setData.password = hashed
          const dbQuery = db.query(`INSERT INTO users SET ?`, setData, (err, result) => {
            delete (setData.password)
            let user_id = result.insertId
            if (err) {
              if (err.code == 'ER_DUP_ENTRY') {
                reject({
                  message: 'Email already exists!',
                })
              } else {
                reject({
                  message: err.sqlMessage,
                })
              }
            }
            resolve({ user_id, ...setData, })
          })
          console.log(dbQuery.sql)
        }
      })
    })
  },
  activation: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE users SET status='active' WHERE id=${id}`, (err, result) => {
        if (err) {
          reject(new Error(`${err.sqlMessage}`))
        }
        resolve({
          result
        })
      })
    })
  },
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT id, email, password, role, photo FROM users WHERE email='${email}'`, (err, result) => {
        if (err) {
          reject(new Error(`${err.sqlMessage}`))
        }
        resolve(result)
      })
    })
  }
}