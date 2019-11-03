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
    res.status(200).send(await ourProducts.findOneAndUpdate({ _id : req.body.ourProducts._id },
    {
      productNr: req.body.ourProducts.productNr,
      productName : req.body.ourProducts.productName,
      price: req.body.ourProducts.price,
      /* picture: req.body.ourProducts.picture, */
      category: req.body.ourProducts.category,
      description: req.body.ourProducts.description,
      protein: req.body.ourProducts.protein,
      spice: req.body.ourProducts.spice,
      ingredients: req.body.ourProducts.ingredients,
    }))
  } catch {
  res.status(404).send(err.stack);
}
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
    res.status(200).send( await ourProducts.findOneAndDelete({_id: req.params.id}));
  } catch(err) {
    res.status(404).send(err.stack);
  }
};
