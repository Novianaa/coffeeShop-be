const express = require("express");
const app = express()
const authRoutes = require('./authRoutes')
const productRoutes = require('./productRoutes')
const orderRoutes = require('./orderRoutes')


app.use('/auth', authRoutes)
app.use('/product', productRoutes)
app.use('/order', orderRoutes)

module.exports = app