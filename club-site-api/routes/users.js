const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {User,validateUser} = require('../models/user');
const bcrypt = require('bcrypt');
const authorization = require('../middleware/authorization');


//Асинхронна функция за показване на всички регистрирани в ДБ юзъри (изисква ауторизация от middleware)
router.get('/',authorization,async(req, res) => {
        const users = await User.find().sort('name');
        res.send(users);
})

//Асинхронна функция за създаване на нов Юзър в ДБ
router.post('/',authorization,async(req, res) => {
        //Валидация на данните подадени от Юзъра в рикуеста, дали отговарят на
        //изискванията на Joi schemata от (User model)
        const {error} = validateUser(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        //Проверява, дали има съществуващ вече Юзър в ДБ с такъв имейл и ако ДА - прекратява създаването на нов юзър
        let user = await User.findOne({email: req.body.email});
        const reqEmail = req.body.email;
        if(user) return res.status(400).send(`User with email: ${reqEmail} already exists.`);

        //Създаване на нов юзър Обект, лоудаш ни показва, кои полета трябва да се попълнят
        //Б.А.Трябва да се проверява лоудаш да не се бие със схемата и модела на USER
        user = new User(_.pick(req.body,['name','email','password','isAdmin']));

        //Генериране на САЛТ от БКРИПТ и хашване на паролата в ДБ
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt);

        //Запазване на Юзъра в ДБ
        await user.save();

        //При правилна регистрация на нов Юзър в хедъра се връща валиден токен,
        //за да не е нужна повторна аутентикация и логване
        const token = user.generateAuthToken();
        res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']));

})

module.exports = router;
