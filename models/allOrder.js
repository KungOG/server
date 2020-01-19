const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let allOrderSchema = new Schema({
  orderInformation: Object,
  comment: String,
  status: Number,
  date: {type: Date, default: Date.now},
  code: String
})

let AllOrder = mongoose.model('allOrder', allOrderSchema);

module.exports = AllOrder;