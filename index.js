const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const scrape = require('./routes/scrape');
const csv = require('./routes/csv');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('static'));
app.use(express.urlencoded());
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// connecting to mongodb
const mongouri = 'mongodb://localhost:27017/rebel';
mongoose.connect(mongouri)
    .then( () => console.log('Connected to MongoDB'))
    .catch( err => console.log('Error while connecting to MongoDB', err));

// Homepage route
app.get('/' ,(req,res) => {
    res.sendFile('index.html');
});

// use Routes
app.use('/scrape' , scrape);
app.use('/csv',csv);

// Starting server on port
port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started at port ${port}`));