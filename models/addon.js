let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let menuAddonsSchema = new Schema({
  name: String,
  price: Number,
});

let menuAddons = mongoose.model('menuAddons', menuAddonsSchema);
module.exports = menuAddons;