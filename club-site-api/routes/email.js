const express = require('express');
const router = express.Router();
const sendGrid = require("@sendgrid/mail");
const _ = require('lodash');


const apiKey = process.env.SENDGRID_API_KEY;



router.post('/', async (req, res) => {
    sendGrid.setApiKey(apiKey);
    const msg = {
        to: req.body.email,
        from: "georgievasen81@gmail.com",
        subject: req.body.subject,
        text: "Thank you, for your e-mail, we will contact with you soon!",
    };

     sendGrid
        .send(msg)
        .then(() => {
            console.log('Email sent successfully!');
            res.status(200).send('success');
        })
        .catch((error) => {
           res.status(401).send('error');
           console.log(error);
        })
});

module.exports = router;
