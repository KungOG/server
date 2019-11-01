let category = require('../models/category');

module.exports.get = async(req, res) => {
  try {
    let outCategories = await category.find({});
    res.status(200).send(outCategories);
  } catch (err) {
    res.status(500).send(err);
  }
};
