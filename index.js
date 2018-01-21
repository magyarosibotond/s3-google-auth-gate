const passport = require('passport');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const request = require('request');

const app = express();

// setup database for user session handling

var configDB = require('./config/credentials.js').db;
mongoose.connect(configDB.url);

app.use(cookieParser());

app.use(session({ secret: '9017e98217gexiudjg187et1g2ex978' }));
app.use(passport.initialize());
app.use(passport.session());

require('./app/routes.js')(app, passport, request);
require('./config/passport')(passport);

app.listen(3000);
