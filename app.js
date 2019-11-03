// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

let app = express();
app.use(express.json());
app.use(cors());

// Connect to our DB
mongoose.connect(process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true })	
  .then(() => {	
    console.info('Connected.')	
  })	
  .catch(err => {	
    console.error(err)	
  });

// Routes
let categories = require('./routes/categories');
let orders = require('./routes/orders');
let products = require('./routes/products');

app.route('/products/:id')
  .delete(products.delete);

app.route('/products')
  .post(products.post)
  .get(products.get);

app.route('/orders');
  // .post(orders.post)
  // .get(orders.get);

app.route('/categories')
  .get(categories.get);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));