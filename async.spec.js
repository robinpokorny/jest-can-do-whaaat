test('callback', done => {
  Promise.resolve(7)
    .then(n => {
      expect(n).toBe(7);
    })
    .then(done)
    .catch(done.fail);
});

test('promises', () => {
  // TODO change to 8
  Promise.resolve(7).then(n => {
    expect(n).toBe(7);
  });

  return Promise.resolve(7).then(n => {
    expect(n).toBe(7);
  });
});

test('reject', () => {
  expect.assertions(1);

  return Promise.reject(0)
    .then(() => {
      throw new Error('Not rejected!');
    })
    .catch(n => {
      expect(n).toBe(0);
    });
});

test('async', async () => {
  const n = await Promise.resolve(7);
  const m = await Promise.resolve(42);

  expect(n).toBe(7);
  expect(m).toBe(42);
});

test('async rejection', async () => {
  try {
    await Promise.reject(0);
  } catch (e) {
    expect(e).toBe(0);
  }
});

test('resolves/rejects', async () => {
  await expect(Promise.resolve(7)).resolves.toBe(7);
  await expect(Promise.reject(0)).rejects.not.toBe(7);
});
