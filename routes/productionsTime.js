let production_time = require('../models/productionTime');

module.exports.get = async(req, res) => {
  try {
    let items = await production_time.find({});
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.patch = async (req, res) => {
  try {
    res.status(200).send(await production_time.findOneAndUpdate({ _id : req.body._id },
    {
      productionTime: req.body.status,
    }))
  } catch {
    res.status(404).send(err.stack);
  }
};
