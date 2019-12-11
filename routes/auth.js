const jwt = require('express-jwt');
const jwksRsa = require("jwks-rsa");
const authConfig = {
  domain: "dev-6foilwku.auth0.com",
  audience: "https://so-i-eat-server.herokuapp.com/"
};

module.exports.validateCustomer = async (token) => {
  try {   
    let checkJwt = await jwt({
      secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
      }),
      audience: authConfig.audience,
      issuer: `https://${authConfig.domain}/`,
      algorithm: ["RS256"]
    });
    return checkJwt;

  } catch(err){
    console.log('De gick ej hela vägen!');
    console.log(err.stack);
    return false;
  }
};
