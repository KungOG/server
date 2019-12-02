let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let timeToDeliverySchema = new Schema({
  time: String,
});

let delivery_times = mongoose.model('delivery_times', timeToDeliverySchema);
module.exports = delivery_times;