// dependencies
const fs = require('fs')
const path = require('path')
const Book = require('../models/Book')

// book get controler
exports.bookGetController = async (req, res) => {
    try {
        const books = await Book.find()
        res.render('index', {books: books})

    } catch(err) {
        res.json({message: err})
    }
}

// book post controller
exports.bookPostController = async (req, res, next) => {
    try {
        // check the book id
        if(req.body.id) {
            // check the req file
            if(req.file) {
                // update book data with book image
                const book = await Book.findOne({_id: req.body.id})
                fs.unlink(path.join(__dirname, `../public/uploads/${book.bookImage}`), err => {})      
                await Book.findOneAndUpdate({_id: req.body.id}, {$set: {
                            bookName: req.body.bookName,
                            authorName: req.body.authorName,
                            shortDescription: req.body.shortDescription,
                            bookImage: req.file.filename
                        }}, {useFindAndModify: false})
                        res.redirect('/books')
            } else {
                // update the book data without book image
                await Book.findOneAndUpdate({_id: req.body.id}, {$set: {
                    bookName: req.body.bookName,
                    authorName: req.body.authorName,
                    shortDescription: req.body.shortDescription
                }}, {useFindAndModify: false})
                res.redirect('/books')
            }
        } else {
            // post a new book data
            const bookData = new Book({
                bookName: req.body.bookName,
                authorName: req.body.authorName,
                shortDescription: req.body.shortDescription,
                bookImage: req.file.filename
            })
            await bookData.save()
            res.redirect('/books')
        }
    } catch(err) {
        res.json({message: err})
    }
}

// book delete controller
exports.bookDeleteController = async (req, res, next) => {
    try {
        const book = await Book.findOneAndDelete({_id: req.params.id})
        fs.unlink(path.join(__dirname, `../public/uploads/${book.bookImage}`), err => {
            if(err) {
                next(err)
            } else {
                res.redirect('/books')      
            }
        })
    } catch(err) {
        res.json({message: err})
    }
}

// book update controller
exports.bookUpdateController = async (req, res, next) => {
    try {
        // const book = await Book.findOne({_id: req.body.id})
        
    } catch(err) {
        res.json({message: err})
    }
}