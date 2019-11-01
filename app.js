// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

let app = express();
app.use(express.json());
app.use(cors());
// Connect to our DB 	
mongoose.connect(`mongodb+srv://FreddieBlue:xHUfwW4qQo083YAh@cluster0-hfptd.mongodb.net/test`, { useNewUrlParser: true })	
    .then(() => {	
        console.info('Connected.')	
    })	
    .catch(err => {	
        console.error(err)	
    });

// Routes
let  = require('./routes/');
let  = require('./routes/');


app.listen(3000, () => {
    console.info('Server is running: 3000.')
});