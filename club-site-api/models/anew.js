const mongoose = require('mongoose');
const Joi = require("joi");
const jwt = require('jsonwebtoken');
const config = require('config');

const anewSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minlength:5,
        maxlength:50
    },
    text:{
        type: String,
        required: true,
        minlength: 10,
        maxlength: 1024
    },
    linkTo:{
        type: String,
        minlength: 0,
        maxlength:255
    },
    eventDate:{
        type: Date,
        default: Date.now,
        required: true
    }
})

    const Anew = mongoose.model('Anew',anewSchema);

    function validateAnew(anew){
        const schema = Joi.object({
            title: Joi.string().required().min(5).max(50),
            text: Joi.string().required().min(10).max(1024),
            linkTo: Joi.string().min(0).max(255).allow('')
        });
        return schema.validate(anew);
    }

    exports.Anew = Anew;
    exports.validateAnew = validateAnew;
    exports.anewSchema = anewSchema;


