const { decodeSecret, encodeText } = require('../helper');

const inputTxt = "Hello, world"
test('Encode and Decode', () => {
  const secret = encodeText(inputTxt)
  const txt =  decodeSecret(secret)
  expect(txt).toBe(inputTxt);
});