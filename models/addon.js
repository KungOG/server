let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let menuAddonsSchema = new Schema({
  name: String,
  price: Number,
});

let menuAddons = mongoose.model('menu_addons', menuAddonsSchema);
module.exports = menuAddons;