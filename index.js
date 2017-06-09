const jwt = require('jsonwebtoken');
const secret = 'shhhhh';

const encode = (data) => jwt.sign(data, secret);

module.exports = {
  encode,
};
