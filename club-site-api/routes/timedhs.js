const express = require('express');
const router = express.Router();
const _ = require('lodash');
const authorization = require('../middleware/authorization');
const {TimeDH,validateTimeDH} = require('../models/timedh');


router.post('/',async (req, res) => {
    const{error} = validateTimeDH(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let timedh = new TimeDH(_.pick(req.body,['day','hour']));
    await timedh.save();
    res.send(timedh);
})

router.get('/',async(req, res) => {
    const timedhs = await TimeDH.find().sort('_id');
    res.send(timedhs);
})

module.exports = router;
