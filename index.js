const express = require('express');
//import express from 'express';
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const key = require('./config/keys');
require('./models/User');
require('./services/passport');

// prod client ID 325610727650-dbkvvdqltpu38djrrlse0892cv07r0pa.apps.googleusercontent.com
//Prod client secret hDwVNNSb9AcKHxAhDmdAi8na
mongoose.connect(key.mongoURI, (error) => {
    if(error) throw error;
    console.log('DB successfully connected.');
});

const app = express();

app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [key.cookieKey]
    })
)
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);


