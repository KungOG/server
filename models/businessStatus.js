let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let businessStatusSchema = new Schema({
  status: String,
});

let business_statuses = mongoose.model('business_statuses', businessStatusSchema);
module.exports = business_statuses;
