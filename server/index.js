'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const {v4: uuid} = require('uuid');
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(body.json());
app.use(cookie());

const Collections = {
  collectionsList: [
    {description: "Топ 256", imgSrc: "top.png", page: "movies"},
    {description: "Приключения", imgSrc: "adventures.png", page: ""},
    {description: "Для всей семьи", imgSrc: "family.png", page: ""},
    {description: "Романтичное", imgSrc: "romantic.png", page: ""},
    {description: "Лучшие драмы", imgSrc: "drama.png", page: ""},
    {description: "Детское", imgSrc: "childish.png", page: ""},
    {description: "Комедии", imgSrc: "comedy.png", page: ""},
    {description: "Спасение мира", imgSrc: "saveTheWorld.png", page: ""},
    {description: "Кинокомиксы", imgSrc: "comics.png", page: ""},
    {description: "Советская классика", imgSrc: "soviet.png", page: ""},
    {description: "Шпионские фильмы", imgSrc: "spy.png", page: ""},
    {description: "Выбор редакции", imgSrc: "ourTop.png", page: ""},

  ]
};

app.get('/api/collections', function(req, res) {
  res.json(Collections);
});


const users = {
    'vasya@bk.ru': {
      email: 'vasya@bk.ru',
      password: 'password1',
    },
    'ivan@bk.ru': {
        email: 'ivan@bk.ru',
        password: 'password1'
    }
  };

const ids = {};

app.post('/signup', function (req, res) {
    const password = req.body.password;
    const email = req.body.email;
    //const age = req.body.age;
    if (!password|| !email) {
        return res.status(400).json({ error: 'Не валидные данные пользователя' });
    }
    if (users[email]) {
        return res.status(402).json({ error: 'Пользователь уже существует' });
    }

    const id = uuid();
    const user = { email, password };
    ids[id] = email;
    users[email] = user;

    res.cookie('podvorot', id, { expires: new Date(Date.now() + 1000 * 60 * 10) });
    res.status(201).json({ id });
});

app.post('/login', function (req, res) {
    const password = req.body.password;
    const email = req.body.email;
    if (!password || !email) {
        return res.status(400).json({ error: 'Не указан E-Mail или пароль' });
    }
    if (!users[email] || users[email].password !== password) {
        return res.status(401).json({ error: 'Не верный E-Mail и/или пароль' });
    }

    const id = uuid();
    ids[id] = email;

    res.cookie('podvorot', id, { expires: new Date(Date.now() + 1000 * 60 * 10) });
    res.status(200).json({ id });
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Server listening port ${port}`);
});
