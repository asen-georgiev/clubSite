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


router.get('/:id',async(req, res) => {
        const anew = await Anew.findById(req.params.id);
        if(!anew) return res.status(404).send('A New with the given ID was not found!');
        res.send(anew);
})


router.put('/:id',async(req, res) => {
       const{error} = validateAnew(req.body);
       if(error) return res.status(400).send(error.details[0].message);

        const anew = await Anew.findByIdAndUpdate(req.params.id,{
                title: req.body.title,
                text: req.body.text,
                linkTo: req.body.linkTo,
                pictureName: req.body.pictureName
        },{new: true});
        if(!anew) return res.status(404).send('A New with the given ID was not found!')
})

router.delete('/:id', async(req, res) => {
        const anew = await Anew.findByIdAndDelete(req.params.id);
        let reqId = req.params.id;
        if(!anew) return res.status(404).send(`A New with ID: ${reqId} was not found!`);
        res.send(anew);
})
module.exports = router;
