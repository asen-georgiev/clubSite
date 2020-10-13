const multer = require("multer");

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'gallery')
    },
    filename: function (req, file, cb) {
        cb(null, today.toDateString() + '-' +file.originalname )
    }
});

const Upload = multer({ storage: storage }).single('file');

exports.Upload = Upload;
