// dependencies
const multer = require('multer')
const path = require('path')

// storage setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads'))
    },
    filename: (req, file, cb) => {
        const extName = path.extname(file.originalname)
        const fileName = file.originalname.replace(extName, '').toLowerCase().split(' ').join('-') + '-' + Date.now()
        cb(null, fileName + extName) 
    }
})

// setup upload object
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter: (req, file, cb) => {
        if(file.fieldname === 'bookImage') {
            if(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                cb(null, true)
            } else {
                cb(new Error('only jpg, jpeg or png formate allowed'))
            }
        } else {
            cb(new Error('there was an unknown error'))
        }
    }
}).single('bookImage')

// export the object
module.exports = upload