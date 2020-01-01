let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schemaForOurProducts = new Schema({
  productNr: String,
  productName: String,
  /* picture: String, */
  category: Number,
  price: Number,
  active: Boolean,
  description: String,
  protein: Array,
  spice: Boolean,
  ingredients: Array,
  extras: Array,
});

let oneProduct = mongoose.model('product', schemaForOurProducts);
module.exports = oneProduct;
