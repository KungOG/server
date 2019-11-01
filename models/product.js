let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schemaForOurProducts = new Schema({
  productNr: Number,
  productName: String,
  /* picture: String, */
  category: Number,
  price: Number,
  description: String,
  protein: Array,
  spice: Boolean,
  ingredients: Array,
});

let oneProduct = mongoose.model('product', schemaForOurProducts);
module.exports = oneProduct;
