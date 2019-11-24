let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let businessHourSchema = new Schema({
  open: String,
  closed: String,
});

let business_hours = mongoose.model('category', businessHourSchema);
module.exports = business_hours;