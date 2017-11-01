test('mockName', () => {
  const mockFn = jest.fn().mockName('mockedFunction');

  expect(mockFn).toHaveBeenCalled();
});
