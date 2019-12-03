const mongoose = require('mongoose');
let Schema = mongoose.Schema;
var currentDate = new Date()
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();

let ourOrderSchema = new Schema({
  orderInformation: Object,
  date: Date(year, month, day),
  code: String
})

let Order = mongoose.model('order', ourOrderSchema);

module.exports = Order;