const express = require("express");
const app = express();
var nodemailer = require('nodemailer');
const mongoose = require("mongoose");
const cors = require("cors");
const env = require("dotenv").config();
const stripe = require("stripe")(
  process.env.STRIPE_SECRET_KEY || process.env.STRIPE_PUBLISHABLE_KEY
);
const jwt = require("express-jwt");
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

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.info("Connected.");
  })
  .catch(err => {
    console.error(err);
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

let categories = require("./routes/categories");
let orders = require("./routes/orders");
let products = require("./routes/products");
let business_hours = require("./routes/businessHours");
let business_status = require("./routes/statuses");
let delivering_time = require("./routes/deliveryTimes");
let addons = require("./routes/addons");
let allOrders = require("./routes/allOrders");

app.route("/products/:id").delete(checkJwt, products.delete);

app
  .route("/products")
  .get(products.get)
  .post(products.post)
  .patch(products.patch);

app
  .route("/businessHours")
  .get(business_hours.get)
  .patch(checkJwt, business_hours.patch);

app
  .route("/deliveryTimes")
  .get(delivering_time.get)
  .patch(checkJwt, delivering_time.patch);

app
  .route("/statuses")
  .get(business_status.get)
  .patch(checkJwt, business_status.patch);

app
  .route("/orders")
  .post(orders.post)
  .patch(checkJwt, orders.patch)
  .get(checkJwt, orders.get);

app.route("/categories").get(categories.get);

app
  .route("/addons")
  .post(addons.post)
  .get(addons.get);

app.route("/allOrders").get(checkJwt, allOrders.get);

app.post("/create-payment-intent", async (req, res) => {
  const { items, currency } = req.body;
  let totalSum = await calculateOrderAmount(items)
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalSum,
    currency: currency,
    metadata: {email: "sandra@queenslab.se"}
  });

  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    clientSecret: paymentIntent.client_secret
  });
});

const calculateOrderAmount = async items => {
  let ourProducts = require("./models/product");
  let addon = require("./models/addon");

    try {
      let products = await ourProducts.find({});
      let addons = await addon.find({});
      let arr = [...products, ...addons];
      let ourProductIds = arr.map(product => {
        return product._id.toString();
      });
      let totalPrice = await items.reduce((acc, item) => {
        let arrPos = ourProductIds.indexOf(item);
        return arrPos > -1 ? acc + arr[arrPos].price : acc;
      }, 0) * 10;
      return totalPrice;

    } catch (err) {
      console.log("Error i rad 134 --> ", err);
    }
}; 

app.post("/webhook", async (req, res) => {
  let data, eventType;

  if (process.env.STRIPE_WEBHOOK_SECRET) {
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
    data = req.body.data.metadata.email;
    eventType = req.body.type;
  }
  if (eventType === "payment_intent.succeeded") {

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'otterstensandra@gmail.com',
        pass: '0JKTUgsp'
      }
    });
    
    var mailOptions = {
      from: 'otterstensandra@gmail.com',
      to: 'sandra@queenslab.se',
      subject: 'Thai Corner Kvitto',
      text: 'Du har käkat för 598:-'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    console.log("💰 Payment captured!");
  } else if (eventType === "payment_intent.payment_failed") {
    console.log("❌ Payment failed.");
  }
  res.sendStatus(200);
});


app.listen(process.env.PORT, () =>
  console.log(`Listening on ${process.env.PORT}`)
);


