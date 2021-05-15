

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const monk = require('monk')
const port = process.env.port || 1210
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const  passport  = require('passport')
const   flash = require('connect-flash')
const   path = require('path')
const config = require('./config/config')
app.use(express.static(path.join(__dirname, 'public')));
const url = require('url')
mongoose.connect(config.dbURI, {useNewUrlParser:true,useUnifiedTopology:true})

var db = monk(config.dbURI)
app.use(function(req, res, next) { req.db = db;
    next(); })

  

 app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: '2181616A8D5AD45EE3A64BE1B325F', saveUninitialized: false, resave: true }));
app.use(passport.initialize());
app.use(passport.session());

require('./config/route.js')(app,url)

app.listen(port);
console.log("you are running on " +  port )

