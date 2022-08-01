const multer = require("multer")

// Set extension for file name
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif"
}

// Call "diskStorage()"" method from multer module
const storage = multer.diskStorage({
    // Set destination
    destination: (req, file, cb) => {
        cb(null, "images/post")
    },
    // Set file name
    filename: (req, file, cb) => {
        const nameExt = file.originalname.split(".")[0]
        const name = nameExt.split(" ").join("_")
        const extension = MIME_TYPES[file.mimetype]
        cb(null, name + Date.now() + "." + extension)
    }
})

module.exports = multer({storage: storage}).single("image")