let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let timeToDeliverySchema = new Schema({
  productionTime: String,
});

let deliveryTime = mongoose.model('deliveryTime', timeToDeliverySchema);
module.exports = deliveryTime;