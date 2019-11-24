let openHours = require('../models/businessHour');

module.exports.get = async(req, res) => {
  try {
    let items = await openHours.find({});
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.patch = async (req, res) => {
  try {
    res.status(200).send(await openHours.findOneAndUpdate({ _id : req.body._id },
    {
      open: req.body.open,
      closed : req.body.closed,
    }))
  } catch {
    res.status(404).send(err.stack);
  }
};
