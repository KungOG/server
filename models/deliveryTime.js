let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let timeToDeliverySchema = new Schema({
  productionTime: String,
});

let delivering_time = mongoose.model('delivering_time', timeToDeliverySchema);
module.exports = delivering_time;