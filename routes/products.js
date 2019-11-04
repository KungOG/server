let ourProducts = require('../models/product');

module.exports.get = async(req, res) => {
  try {
    let items = await ourProducts.find({});
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.patch = async (req, res) => {
  try {
    res.status(200).send(await ourProducts.findOneAndUpdate({ _id : req.body._id },
    {
      productNr: req.body.productNr,
      productName : req.body.productName,
      /* picture: req.body.picture, */
      category: req.body.category,
      price: req.body.price,
      description: req.body.description,
      protein: req.body.protein,
      spice: req.body.spice,
      ingredients: req.body.ingredients
    }))
  } catch {
    res.status(404).send(err.stack);
  }
};

module.exports.post = async(req, res) => {
  try {
    let oneProduct = req.body;
    let resp = await ourProducts.create(oneProduct);
    res.status(200).send(resp);
  } catch(err) {
    res.status(400).send(err.stack);
  }
};

module.exports.delete = async (req, res) => {
  try {
    res.status(200).send( await ourProducts.findOneAndDelete({ _id: req.params.id }));
  } catch(err) {
    res.status(404).send(err.stack);
  }
};
