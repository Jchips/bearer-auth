'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {
  try {

    if (!req.headers.authorization) { return next('Invalid Login'); }

    let basic = req.headers.authorization.split(' ');
    let encodedString = basic.pop();  // am9objpmb28=
    let decodedString = base64.decode(encodedString); // "username:password"
    let [username, pass] = decodedString.split(':');
    req.user = await users.authenticateBasic(username, pass);
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }

};

