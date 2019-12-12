const ourOrders = require('../models/order');

module.exports.get = async(req, res) => {
  try { 
    let items = await ourOrders.find({})
    items = items.filter((item) => {
      return new Date(Date.parse(item.date)).toDateString() === new Date(Date.now()).toDateString() && item.status !== 4
    })
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send(err);
  }
};
  
module.exports.post = async(req, res) => {
  try {
    let theOrder = {
      orderInformation: req.body,
      code: uid(6),
      status: 0,
    }
    let resp = await ourOrders.create(theOrder);
    res.status(200).send(resp);
  } catch(err) {
    res.status(404).send(err.stack);
  }
};

module.exports.patch = async (req, res) => {
  if (req.body.status < 4) {
    try {
      res.status(200).send(await ourOrders.findOneAndUpdate({ _id : req.body._id },
      {
        status: req.body.status,
      }))
    } catch {
      res.status(404).send(err.stack);
    }
  } else if (req.body.orderInformation) {
      try {
        res.status(200).send(await ourOrders.findOneAndUpdate({ _id : req.body._id },
        {
          orderInformation: req.body.orderInformation,
        }))
      } catch {
        res.status(404).send(err.stack);
      }

  }
};

function uid(len){
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  let Arr = [];

  for(let i=0; i<len; i++){
    Arr.push(chars[Math.floor(Math.random()*chars.length)]);
  }

  return Arr.join('');
};
