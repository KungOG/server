let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let buisnessHourSchema = new Schema({
  open: String,
  closed: String,
});

let buisness_hours = mongoose.model('category', buisnessHourSchema);
module.exports = buisness_hours;