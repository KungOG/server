const allOrders = require('../models/allOrder');

module.exports.get = async(req, res) => {
  try { 
    let items = await allOrders.find({})
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send(err);
  }
};