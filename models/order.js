const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ourOrderSchema = new Schema({
  orderInformation: Object,
  code: String
})

let Order = mongoose.model('orderInformation', ourOrderSchema);

module.exports = Order;