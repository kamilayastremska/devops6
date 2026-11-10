const sum = require('../src/sum');

test('sum(2, 3) дорівнює 5', () => {
  expect(sum(2, 3)).toBe(5);
});
