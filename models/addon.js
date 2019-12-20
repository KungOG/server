let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let menuAddonsSchema = new Schema({
  name: String,
  price: Number,
});

let menu_addons = mongoose.model('menu_addons', menuAddonsSchema);
module.exports = menu_addons;