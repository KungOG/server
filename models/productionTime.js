let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let businessHourSchema = new Schema({
  productionTime: String,
});

let productionTime = mongoose.model('productionTime', businessHourSchema);
module.exports = productionTime;