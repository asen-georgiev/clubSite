const express = require('express');
const router = express.Router();
const multer = require("multer");
const {Upload} = require('../models/image');

router.post('/',(req, res) => {
   Upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)
    })

})

module.exports = router;
