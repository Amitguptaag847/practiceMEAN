const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/users');
const path = require('path');

const app = express();

// DB config
const db = require('./config/keys').mongoURI;
// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log('MongoDB commected...'))
    .catch(err => console.log(err));

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname)));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

// Routes
app.use('/users', users);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port : ${PORT}...`)).on('error', (err) => console.log(err));