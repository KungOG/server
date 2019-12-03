const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;
const day = new Date().getDate();

let ourOrderSchema = new Schema({
  orderInformation: Object,
  date: new Date(year, month, day),
  code: String
})

let Order = mongoose.model('order', ourOrderSchema);

module.exports = Order;