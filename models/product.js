let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schemaForOurProducts = new Schema({
  name: String
});

let oneProduct = mongoose.model('product', schemaForOurProducts);

module.exports = oneProduct;