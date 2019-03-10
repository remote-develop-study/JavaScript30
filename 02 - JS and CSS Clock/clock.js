/**
 * @description called every second and rotates hands
 * @param {object} counter - hold time variable
 */
function tick(counter) {
  const sec = getHand('.clock .sec')
  const min = getHand('.clock .min')
  const hour = getHand('.clock .hour')

  rotateHand(sec, counter.getCount() * 360 / 60 - 90)
  rotateHand(min, Math.trunc(counter.getCount() / 60) * 360 / 60 - 90)
  rotateHand(hour, Math.trunc(counter.getCount() / (60 * 60)) * 360 / 12 - 90)

  counter.increase()
}

/**
 * @description get a hand element by a selector
 * @param {string} selector - css query selector
 * @returns found html element by the selector
 */
function getHand(selector) {
  return document.querySelector(selector)
}

/**
 * @description rotate an element to a given degree
 * @param {object} element 
 * @param {number} degree 
 */
function rotateHand(element, degree) {
  element.style.transform = `rotate(${degree}deg)`
}

/**
 * @description create a counter holding time variable
 * @returns an object with two methods
 */
function createCounter() {
  let count = 0

  return {
    getCount: () => {
      return count 
    },
    increase: () => {
      count++
    }
  }
}

// create a counter and call tick every second
const counter = createCounter()
setInterval(() => tick(counter), 1000)

module.exports = {
  tick: tick,
  getHand: getHand,
  rotateHand: rotateHand,
  createCounter: createCounter
}
