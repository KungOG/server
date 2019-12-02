let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productionTimeSchema = new Schema({
  productionTime: String,
});

let productionTime = mongoose.model('productionTime', productionTimeSchema);
module.exports = productionTime;