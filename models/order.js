const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ourOrderSchema = new Schema({
  orderInformation: {
    table: String,
    foodItems: [{
      productNr: Number,
      productName: String,
      /* picture: String, */
      category: Number,
      price: Number,
      active: Boolean,
      status: Number,
      description: String,
      protein: Array,
      spice: Boolean,
      ingredients: Array,
      extras: Array,
    }],
    drinkItems: [{
      productNr: Number,
      productName: String,
      /* picture: String, */
      category: Number,
      price: Number,
      active: Boolean,
    }],
  },
  status: Number,
  date: {type: Date, default: Date.now},
  code: String
})

let Order = mongoose.model('order', ourOrderSchema);

module.exports = Order;