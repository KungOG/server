
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const env = require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY || process.env.STRIPE_PUBLISHABLE_KEY);
const jwt = require('express-jwt');
const jwksRsa = require("jwks-rsa");
const authConfig = {
  domain: "dev-6foilwku.auth0.com",
  audience: "https://so-i-eat-server.herokuapp.com/"
};

app.use(cors());
//app.use(express.static(process.env.STATIC_DIR));
app.use(
  express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function(req, res, buf) {
      if (req.originalUrl.startsWith("/webhook")) {
        req.rawBody = buf.toString();
      }
    }
  })
);

mongoose.connect(process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true })	
  .then(() => {	
    console.info('Connected.')	
  })	
  .catch(err => {	
    console.error(err)	
});

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ["RS256"]
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
  .post(products.post)
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


app.post("/create-payment-intent", async (req, res) => {
  const { items, currency } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: currency
  });

  // Send publishable key and PaymentIntent details to client
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    clientSecret: paymentIntent.client_secret
  });
});


const calculateOrderAmount = items => {
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  
  return 1200;
}

// Expose a endpoint as a webhook handler for asynchronous events.
// Configure your webhook in the stripe developer dashboard
// https://dashboard.stripe.com/test/webhooks
app.post("/webhook", async (req, res) => {
  let data, eventType;

  // Check if webhook signing is configured.
  if (process.env.STRIPE_WEBHOOK_SECRET) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`);
      return res.sendStatus(400);
    }
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // we can retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }

  if (eventType === "payment_intent.succeeded") {
    // Funds have been captured
    // Fulfill any orders, e-mail receipts, etc
    // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
    console.log("💰 Payment captured!");
  } else if (eventType === "payment_intent.payment_failed") {
    console.log("❌ Payment failed.");
  }
  res.sendStatus(200);
});



app.listen(process.env.PORT, () => console.log(`Listening on ${ process.env.PORT }`));



