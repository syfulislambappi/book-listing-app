// dependencies
const router = require('express').Router()
const { bookGetController, bookPostController, bookDeleteController, bookUpdateController } = require('../controllers/bookControllers')
const upload = require('../utils/fileUploader')

// get book route
router.get('/', bookGetController)

// post book route
router.post('/', upload, bookPostController)

// delete book route
router.get('/delete/:id', bookDeleteController)

// export the router
module.exports = router