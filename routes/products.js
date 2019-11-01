let ourProducts = require('../models/product');

module.exports.get = async(req, res) => {
  try {
    let items = await ourProducts.find({});
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.post = async(req, res) => {
  try {
    let oneProduct = req.body;
    let resp = await ourProducts.create(oneProduct);
    res.status(200).send(resp);
  } catch {
    resp.status(400).send(err);
  }
};

module.exports.delete = async (req, res) => {
  try {
    res.status(200).send( await ourProducts.findOneAndDelete({_id: req.params.id}));
  } catch(err) {
    res.status(404).send(err.stack);
  }
};
