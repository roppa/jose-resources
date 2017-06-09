const test = require('tape').test;
const jwt = require('..');

test('jwt.encode should turn an object into a jwt', assert => {
  const myJwt = jwt.encode({ a: 1 });
  const split = myJwt.split('.');
  const segment1 = JSON.parse(Buffer.from(split[0], 'base64'));
  const segment2 = JSON.parse(Buffer.from(split[1], 'base64'));
  assert.equals(typeof myJwt, 'string', 'should return a string');
  assert.equals(myJwt.match(/\./g).length, 2, 'should have 3 segments concatenated by periods');
  assert.equals(segment1.alg, 'HS256', 'should be the default HS256 algorithm');
  assert.equals(segment1.typ, 'JWT', 'should be the default type of JWT');
  assert.equals(segment2.a, 1, 'should store original property');
  assert.equals(typeof segment2.iat, 'number', 'should have default iat property');
  assert.throws(() => JSON.parse(Buffer.from(split[2], 'base64')), undefined,
    'should throw when trying to parse segment 3');
  assert.end();
});
