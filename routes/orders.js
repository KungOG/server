const ourOrders = require('../models/order');

module.exports.get = async(req, res) => {
  try {
    let items = await ourOrders.aggregate({
      "$project": {
        "year": {
          "$year": "$orderInformation.time"
        },
        "month": {
          "$month": "$orderInformation.time"
        },
        "day": {
          "$dayOfMonth": "$orderInformation.time"
        },
      }
    }, {
        "$match": {
          "year": Date().getFullYear(),
          "month": Date().getMonth() + 1,
          "day": Date().getDate(),
        },
    });
    console.log(items);
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
    }
    let resp = await ourOrders.create(theOrder);
    res.status(200).send(resp);
  } catch(err) {
    res.status(404).send(err.stack);
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
