const express = require('express');
const router = express.Router();
const _ = require('lodash');
const authorization = require('../middleware/authorization');
const {TimeTable,validateTimeTable} = require('../models/timetable');
const {Course,validateCourse} = require('../models/course');
const {TimeDH,validateTimeDH} = require('../models/timedh');




router.post('/',async (req, res) => {
    const {error} = validateTimeTable(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const course = await Course.findById(req.body.courseId);
    if(!course) return res.status(404).send('Invalid course ID!');

    const timedh = await TimeDH.findById(req.body.timedhId);
    if(!timedh) return res.status(404).send('Invalid day and hour ID!');

    let timetable = new TimeTable({
        course:{
            _id: course._id,
            courseName: course.courseName,
            courseInfo: course.courseInfo,
            coursePrice: course.coursePrice,
            courseAge: course.courseAge
        },
        timedh:{
            _id: timedh._id,
            day: timedh.day,
            hour: timedh.hour
        }
    });

    await timetable.save();
    res.send(timetable);
})


router.get('/',async (req, res) => {
    const timetables = await TimeTable.find().sort('_id');
    res.send(timetables);
})



module.exports = router;
