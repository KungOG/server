let businessStatuses = require('../models/businessStatus');

module.exports.get = async(req, res) => {
  try {
    let items = await businessStatuses.find({});
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.patch = async (req, res) => {
  try {
    res.status(200).send(await businessStatuses.findOneAndUpdate({ _id : req.body._id },
    {
      status: req.body.status,
    }))
  } catch {
    res.status(404).send(err.stack);
  }
};