if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()   //     require('dotenv').parse()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts) 
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})

// mongoose.connect('mongodb://localhost:27017/mybrary', {useNewUrlParser: true}, {useUnifiedTopology: true});

const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to Mongoose'))

console.log(`NODE_ENV = ${process.env.NODE_ENV}`)

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)