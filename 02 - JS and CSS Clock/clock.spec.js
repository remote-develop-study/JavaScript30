const tick = require('./clock').tick
const getHand = require('./clock').getHand
const rotateHand = require('./clock').rotateHand
const createCounter = require('./clock').createCounter

describe('clock related functions are functions', () => {
  test('tick should be a function', () => {
    expect(typeof tick).toBe('function')
  })
  
  test('getHand should be a function', () => {
    expect(typeof getHand).toBe('function')
  })

  test('rotateHand should be a function', () => {
    expect(typeof rotateHand).toBe('function')
  })
  
  test('createCounter should be a function', () => {
    expect(typeof createCounter).toBe('function')
  })
})

describe('test createCounter', () => {
  let counter
  
  beforeEach(() => {
    counter = createCounter()
  })

  test('counter should be an object', () => {
    expect(typeof counter).toBe('object')
  })

  test("counter's two properties are functions", () => {
    expect(typeof counter.getCount).toBe('function')
    expect(typeof counter.increase).toBe('function')
  })

  test('initial value of createCounter is 0', () => {
    expect(counter.getCount()).toEqual(0)
  })

  test('after increasing count should be increased by one every call', () => {
    counter.increase()
    expect(counter.getCount()).toEqual(1)
    counter.increase()
    counter.increase()
    expect(counter.getCount()).toEqual(3)
  })
})

describe('test getHand', () => {
  const html = `
    <div class="clock">
      <div class="hand sec"></div>
      <div class="hand min"></div>
      <div class="hand hour"></div>
    </div>
  `

  test('getHand should return an object(html dom)', () => {
    expect(typeof getHand('.clock .sec')).toBe('object')
  })
})

describe('test rotateHand', () => {
  document.body.innerHTML = `
    <div class="clock">
      <div class="hand sec"></div>
      <div class="hand min"></div>
      <div class="hand hour"></div>
    </div>
  `

  let counter
  
  beforeEach(() => {
    counter = createCounter()
  })

  test('rotateHand should rotate sec div element by 6 degree after 1 second', () => {
    const sec = getHand('.clock .sec')

    rotateHand(sec, counter.getCount() * 360 / 60 - 90)
    expect(sec.style.transform).toBe('rotate(-90deg)')

    counter.increase()
    rotateHand(sec, counter.getCount() * 360 / 60 - 90)
    expect(sec.style.transform).toBe('rotate(-84deg)')
  })
})
