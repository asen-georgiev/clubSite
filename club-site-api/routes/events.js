const express = require('express');
const router = express.Router();
const _ = require('lodash');
const authorization = require('../middleware/authorization');
const {EventCalendar,validateEventCalendar} = require('../models/event');


router.post('/',authorization,async(req, res) => {
    const{error}=validateEventCalendar(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let eventCalendar = await EventCalendar.findOne({eventTitle: req.body.eventTitle});
    const reqTitle = req.body.eventTitle;
    if(eventCalendar) return res.status(400).send(`An event with ${reqTitle} already exists.`);

    eventCalendar = new EventCalendar(_.pick(req.body,['eventTitle','eventInfo','eventDate','eventLocation','eventLink']));
    await eventCalendar.save();
    res.send(eventCalendar);
})

router.get('/',async(req, res) => {
    const eventCalendar = await EventCalendar.find().sort('eventDate');
    res.send(eventCalendar);
})
module.exports = router;
