let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productionTimeSchema = new Schema({
  productionTime: String,
});

let productionTime = mongoose.model('productionsTime', productionTimeSchema);
module.exports = productionTime;