const express = require('express');
const router = express.Router();
const _ = require('lodash');
const authorization = require('../middleware/authorization');
const{ClubBio,validateClubBio}= require('../models/clubbio');



router.post('/',async(req, res) => {
    const{error} = validateClubBio(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let clubBio = await ClubBio.findOne({bioTitle: req.body.bioTitle});
    const reqTitle = req.body.bioTitle;
    if(clubBio) return res.status(400).sent(`The club biography with title: ${reqTitle} already exists.`)

    clubBio = new ClubBio(_.pick(req.body,['bioTitle','bioText']));
    await clubBio.save();
    res.send(clubBio);
})


//All club Bios
router.get('/',async(req, res) => {
    const clubBio = await ClubBio
        .find()
        .select("-__v")
        .sort('bioTitle');
    res.send(clubBio);
})

router.delete('/:id', async(req, res) => {
    const clubBio = await ClubBio.findByIdAndDelete(req.params.id);
    let reqId = req.params.id;
    if(!clubBio) return res.status(404).send(`Biography with Id: ${reqId} was not found`);
    res.send(clubBio);
})

module.exports = router;
