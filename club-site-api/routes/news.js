const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {Anew,validateAnew} = require('../models/anew');
const authorization = require('../middleware/authorization');


router.post('/',authorization, async(req, res) => {
        const{error}=validateAnew(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        let anew = await Anew.findOne({title: req.body.title});
        const reqTitle = req.body.title;
        if(anew) return res.status(400).send(`A new with ${reqTitle} already exists.`);

        anew = new Anew(_.pick(req.body,['title','text','linkTo','pictureName']));
        await anew.save();
        res.send(anew);
})

router.get('/',async(req, res) => {
        const news = await Anew.find().sort('eventDate');
        res.send(news);
})
module.exports = router;
