// Brings in the installed dependency
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const  morgan = require('morgan');

// This is how you create an express app
const app = express();

// Adding the MiddleWare

// This is a logger. 'tiny' is the basic mode
app.use(morgan('tiny'));

//
app.use(cors());

// This is a JSON Body parser. It parses the data we send/receive
app.use(bodyParser.json());

// Basic get request, followed by a handler
app.get('/', (req, res) => {
   res.json({
      message: 'Fullstack Message board! 👯👯👯'
   });
});

// Starts listening to either port defined in .env file, or 2727
const port = process.env.PORT || 2727;
app.listen(port, () => {
    console.log(`listening on ${port}`)
});
