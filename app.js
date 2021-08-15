// dependencies
require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bookRouter = require('./routes/bookRoutes')

// express app scaffolding
const app = express()

// body parsers
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// setup port
const PORT = process.env.PORT || 5000

// setup static folder
app.use(express.static(path.join(__dirname, 'public')))

// setup view engine
app.set('view engine', 'ejs')

// setup routes
app.use('/books', bookRouter)
app.get('/', (req, res) => {
    res.redirect('/books')
})

// setup mongodb database
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('database connected')
        // connect server
        app.listen(PORT, () => {
            console.log(`server is running on http://localhost:${PORT}`)
        })
    })
    .catch(err => {
        console.log(err)
    })