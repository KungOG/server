const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ourOrderSchema = new Schema({
  orderInformation: Object,
  date: {type: Date},
  code: String
})

let Order = mongoose.model('order', ourOrderSchema);

module.exports = Order;