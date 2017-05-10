// declaring dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Conncet to DB
mongoose.connect(config.database);

// On connection
mongoose.connection.on('connected', () => {
  console.log('connected to database '+config.database);
});


// Error connection
mongoose.connection.on('error', (err) => {
  console.log('database error '+err);
});


 //initialize app variable
const app = express();

const users = require('./routes/users');

const port = 3000;

// cors parser middleware
app.use(cors());

//Set static folder file
app.use(express.static(path.join(__dirname, 'public')));

// body parser middleware
app.use(bodyParser.json());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// index route
app.get('/', (req, res) =>  {
  res.send('invalid endpoint')
});

// start server
//arrow function  (lighter synthax)
app.listen(port, () => {
  console.log('server started on port '+port);
});
