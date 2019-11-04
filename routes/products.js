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
    res.status(200).send(await ourProducts.findOneAndUpdate({ _id : req.body.newProduct._id },
    {
      productNr: req.body.newProduct.productNr,
      productName : req.body.newProduct.productName,
      /* picture: req.body.newProduct.picture, */
      category: req.body.newProduct.category,
      price: req.body.newProduct.price,
      description: req.body.newProduct.description,
      protein: req.body.newProduct.protein,
      spice: req.body.newProduct.spice,
      ingredients: req.body.newProduct.ingredients
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
