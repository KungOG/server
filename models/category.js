  
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let categorySchema = new Schema({
  name: String
});

let category = mongoose.model('celeb', categorySchema);
module.exports = category;
