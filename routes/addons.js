const Addons = require('../models/addon');

module.exports.get = async(req, res) => {
  try { 
    let addons = await Addons.find({});
    res.status(200).send(addons);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.post = async(req, res) => {
  try {
    let theAddon = {
      orderInformation: req.body.name,
      price: req.body.number,
    }
    let resp = await Addons.create(theAddon);
    res.status(200).send(resp);
  } catch(err) {
    res.status(404).send(err.stack);
  }
};