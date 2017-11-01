const moduleA = require('./moduleA');

test('moduleA', () => {
  expect(moduleA()).toBe(true);
});
