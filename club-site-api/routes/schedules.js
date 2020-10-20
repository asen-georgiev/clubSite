const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {Schedule,validateSchedule} = require('../models/schedule');
const authorization = require('../middleware/authorization');



router.post('/',authorization,async(req, res) => {

    const{error}=validateSchedule(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let schedule = new Schedule(_.pick(req.body,['classDay','classHour','classClass','classAge']));
    await schedule.save();

    res.send(schedule);
})

router.get('/',async (req, res) => {
    const schedules = await Schedule.find().sort('classDay');
    res.send(schedules);
})













module.exports = router;
