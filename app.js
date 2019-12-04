// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

let app = express();
app.use(express.json());
app.use(cors());

// Connect to our DB
const mnguri = "mongodb+srv://FreddieBlue:xHUfwW4qQo083YAh@cluster0-hfptd.mongodb.net/thai-corner?retryWrites=true&w=majority"
mongoose.connect(mnguri,
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
let business_hours = require('./routes/businessHours');
let business_status = require('./routes/statuses');
let delivering_time = require('./routes/deliveryTimes');

app.route('/products/:id')
  .delete(products.delete);

app.route('/products')
  .get(products.get)
  .post(products.post)
  .patch(products.patch);

app.route('/businessHours')
  .get(business_hours.get)
  .patch(business_hours.patch);

app.route('/deliveryTimes')
  .get(delivering_time.get)
  .patch(delivering_time.patch);

app.route('/statuses')
  .get(business_status.get)
  .patch(business_status.patch);

app.route('/orders')
  .post(orders.post)
  .patch(orders.patch)
  .get(orders.get);

app.route('/categories')
  .get(categories.get);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
