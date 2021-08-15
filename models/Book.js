// dependencies
const mongoose = require('mongoose')

// create book schema
const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    bookImage: {
        type: String,
        required: true
    }
})

// create book model
const Book = mongoose.model('Book', bookSchema)

// export the model
module.exports = Book