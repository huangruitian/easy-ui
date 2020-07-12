test('test common matcher', () => {
  expect(2 + 2).toBe(4)
  expect(2 + 2).not.toBe(5)
})

test("test to be true or false", () => {
  expect(0).toBeFalsy()
  expect(1).toBeTruthy()
})

test("test number ", () => {
  expect(4).toBeGreaterThan(3)
  expect(4).toBeLessThan(5)
})

// 我们有这个通用的测试工具Jest还不够，还需要react组件的测试工具；
