/**
 * After using the assertions provided by Jest, let's implement them ourselves.
 *
 * Task: Write a function `fn` that creates a mock function has `mock.calls`.
 *
 * Execute: Use `npx jest --watch src/no-framework/mock-fn.js` to watch the test
 */

const assert = require('assert')
const thumbWar = require('../thumb-war')
const utils = require('../utils')

// Your Code:

// Receive implementation as parameter
function fn(impl) {
  // pass arguments to the mockFn()
  const mockFn = (...args) => {
    // count calls with the args
    mockFn.mock.calls.push(args)
    return impl(...args)
  }
  mockFn.mock = {calls: []}
  return mockFn
}

const originalGetWinner = utils.getWinner
utils.getWinner = fn((p1, _p2) => p1)

const winner = thumbWar('Helder', 'Paula')
assert.strictEqual(winner, 'Helder')
assert.deepStrictEqual(utils.getWinner.mock.calls, [
  ['Helder', 'Paula'],
  ['Helder', 'Paula']
])

// cleanup
utils.getWinner = originalGetWinner
