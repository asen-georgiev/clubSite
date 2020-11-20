const express = require('express');
const router = express.Router();
const _ = require('lodash');
const authorization = require('../middleware/authorization');
const {Course,validateCourse} = require('../models/course');


router.post('/',async(req, res) => {
    const {error} = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let course = new Course(_.pick(req.body,['courseName','courseInfo','coursePrice','courseAge']));
    await course.save();
    res.send(course);
})


router.get('/', async(req, res) => {
    const courses = await Course.find().sort('_id');
    res.send(courses);
})


module.exports = router;
