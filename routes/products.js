let ourProducts = require('../models/product');
let auth = require('./auth');

module.exports.get = async(req, res) => {
  try {
    let items = await ourProducts.find({});
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.patch = async (req, res) => {
  if(await auth.validateCustomer(req.headers.authorization)) {
    if(req.body.productName) {
      try {
        res.status(200).send(await ourProducts.findOneAndUpdate({ _id : req.body._id },
        {
          productNr: req.body.productNr,
          productName : req.body.productName,
          /* picture: req.body.picture, */
          category: req.body.category,
          price: req.body.price,
          active: req.body.active,
          description: req.body.description,
          protein: req.body.protein,
          spice: req.body.spice,
          ingredients: req.body.ingredients,
          extras: req.body.extras
        }))
      } catch {
        res.status(404).send(err.stack);
      }
    } else {
      try {
        res.status(200).send(await ourProducts.findOneAndUpdate({ _id : req.body._id },
        {
          active: req.body.active,
        }))
      } catch {
        res.status(404).send(err.stack);
      }
    }
  } else {
    res.status(500).send('You do not have permission to do this.');
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
