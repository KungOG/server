let time_to_delivery = require('../models/deliveryTime');

module.exports.get = async(req, res) => {
  try {
    let items = await time_to_delivery.find({});
    console.log('Körs', items);
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.patch = async (req, res) => {
  try {
    res.status(200).send(await time_to_delivery.findOneAndUpdate({ _id : req.body._id },
    {
      productionTime: req.body.productionTime,
    }))
  } catch {
    res.status(404).send(err.stack);
  }
};
