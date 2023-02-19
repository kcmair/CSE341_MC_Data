const express = require("express");
const dotenv = require('dotenv').config();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const morgan = require('morgan')
const cors = require('cors');
const port = process.env.PORT || 8080;
const app = express();
const passport = require('passport');
const session = require('express-session');

dotenv.config({path: './config/.env'});
const uri = process.env.CONNECTION_STRING;

require('./config/passport')(passport);

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(morgan('dev'))
  .use(cors())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes"))
  .use(session({
    secret: 'send it',
    resave: false,
    saveUninitialized: false,
  }))
  .use(passport.initialize())
  .use(passport.session())

mongoose.set('strictQuery', true)
const options = {
  dbName: "steel_horses",
  connectTimeoutMS: 2000,
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const ConnectToDB = async () => {
  try {
    await mongoose.connect(uri, options);
    console.log("app successfully connected to mongodb");
    app.listen(port, () => console.log(`server running at port ${port}`));
  } catch (error) {
    console.log("error is:", error.message);
  }
}

ConnectToDB();

