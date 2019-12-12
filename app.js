
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const jwt = require('express-jwt');
const jwksRsa = require("jwks-rsa");
const authConfig = {
  domain: "dev-6foilwku.auth0.com",
  audience: "https://so-i-eat-server.herokuapp.com/"
};

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ["RS256"]
});

let app = express();
app.use(express.json());
app.use(cors());

const mnguri = "mongodb+srv://FreddieBlue:xHUfwW4qQo083YAh@cluster0-hfptd.mongodb.net/thai-corner?retryWrites=true&w=majority"
mongoose.connect(mnguri,
  { useNewUrlParser: true, useUnifiedTopology: true })	
  .then(() => {	
    console.info('Connected.')	
  })	
  .catch(err => {	
    console.error(err)	
});

let categories = require('./routes/categories');
let orders = require('./routes/orders');
let products = require('./routes/products');
let business_hours = require('./routes/businessHours');
let business_status = require('./routes/statuses');
let delivering_time = require('./routes/deliveryTimes');

app.route('/products/:id')
  .delete(checkJwt, products.delete);

app.route('/products')
  .get(products.get)
  .post(checkJwt, products.post)
  .patch(checkJwt, products.patch);

app.route('/businessHours')
  .get(business_hours.get)
  .patch(checkJwt, business_hours.patch);

app.route('/deliveryTimes')
  .get(delivering_time.get)
  .patch(checkJwt, delivering_time.patch);

app.route('/statuses')
  .get(business_status.get)
  .patch(checkJwt, business_status.patch);

app.route('/orders')
  .post(orders.post)
  .patch(checkJwt, orders.patch)
  .get(checkJwt, orders.get);

app.route('/categories')
  .get(categories.get);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
