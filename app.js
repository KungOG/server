// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

let app = express();
app.use(express.json());
app.use(cors());

// Connect to our DB 	
mongoose.connect(`mongodb+srv://FreddieBlue:xHUfwW4qQo083YAh@cluster0-hfptd.mongodb.net/thai-corner`, { useNewUrlParser: true })	
  .then(() => {	
    console.info('Connected.')	
  })	
  .catch(err => {	
    console.error(err)	
  });

// Routes
let  = require('./routes/categories');
let  = require('./routes/orders');
let  = require('./routes/products');

app.route('/products/:id');
  // .delete(products.delete);

app.route('/products');
  // .post(products.post)
  // .get(products.get);

app.route('/orders');
  // .post(orders.post)
  // .get(orders.get);

app.route('/categories');
  // .get(categories.get);


app.listen(3000, () => {
  console.info('Server is running: 3000.')
});