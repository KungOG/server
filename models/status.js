let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let statusSchema = new Schema({
  status: String,
});

let status = mongoose.model('status', statusSchema);
module.exports = status;
