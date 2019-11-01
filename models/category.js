  
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let categorySchema = new Schema({
  name: String
});

let categories = mongoose.model('category', categorySchema);
module.exports = categories;
