const express = require("express");
const helmet = require("helmet");
const users = require('../routes/users');
const images = require('../routes/images');
const email = require('../routes/email');
const news = require('../routes/news');
const schedules = require('../routes/schedules');
const events = require('../routes/events');
const authentication = require('../routes/authentication');

//Файл за руутовете
    module.exports = function(app){
        app.use(express.json());
        app.use(express.urlencoded({extended: true}));
        app.use(express.static('public'));
        app.use(express.static('gallery'));
        app.use(helmet());
        app.use('/api/users',users);
        app.use('/api/images',images);
        app.use('/api/auth',authentication);
        app.use('/api/email',email);
        app.use('/api/news',news);
        app.use('/api/schedules',schedules);
        app.use('/api/events',events);
    };
