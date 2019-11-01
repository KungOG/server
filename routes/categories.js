let Category = require('../models/category');

module.exports.get = async(req, res) => {
  try {
    let outCategories = await Category.find({});
    res.status(200).send(outCategories);
  } catch (err) {
    res.status(500).send(err);
  }
};
