const express = require("express");
const app = express()
const authRoutes = require('./authRoutes')
const productRoutes = require('./productRoutes')
const orderRoutes = require('./orderRoutes')
const userRoutes = require('./userRoutes')


app.use('/auth', authRoutes)
app.use('/product', productRoutes)
app.use('/order', orderRoutes)
app.use('/user', userRoutes)

module.exports = app