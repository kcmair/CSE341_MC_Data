const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');

require('mongoose');
require('dotenv').config();
require('./config/passport')(passport);

connectDB();

const port = process.env.PORT || 8080;
const app = express();

app
  .use(
    bodyParser.urlencoded({
      extended: false,
    })
  )
  .use(bodyParser.json())
  .use(morgan('dev'))
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use(cors())
  .use(
    session({
      secret: 'send it',
      resave: false,
      saveUninitialized: false,
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use(function (req, res, next) {
    res.locals.user = req.user || null;
    next();
  })
  .use('/', require('./routes/index'))
  .use('/auth', require('./routes/auth'))
  .use('/bikes', require('./routes/bikes'))
  .listen(port, () => console.log(`server running at port ${port}`));
