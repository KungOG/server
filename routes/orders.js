/* const ourOrders = require('../models/order');

module.exports.get = async(req, res) => {
  try {
    let items = await ourOrders.find({});
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
  } catch(err) {
    res.status(400).send(err.stack);
  }
};

*/