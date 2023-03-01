const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

require('dotenv').config();
require('./config/passport')(passport);

const uri = process.env.CONNECTION_STRING;
const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  .use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
  .use(morgan('dev'))
  .use(cors())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'))
  .use('/auth', require('./routes/auth'))
  .use(
    session({
      secret: 'send it',
      resave: false,
      saveUninitialized: false,
    })
  )
  .use(passport.initialize())
  .use(passport.session());

mongoose.set('strictQuery', true);
const options = {
  dbName: 'steel_horses',
  connectTimeoutMS: 2000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const ConnectToDB = async () => {
  try {
    await mongoose.connect(uri, options);
    console.log('app successfully connected to mongodb');
    app.listen(port, () => console.log(`server running at port ${port}`));
  } catch (error) {
    console.log('error is:', error.message);
  }
};

ConnectToDB();
