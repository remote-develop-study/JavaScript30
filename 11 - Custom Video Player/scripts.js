const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')

const togglePlay = (event) => {
  // Learned!: video tag has a property called paused
  const method = video.paused ? 'play' : 'pause'
  video[method]()
}

const updateButton = ({ target }) => {
  // Learned!: textContent
  toggle.textContent = target.paused ? '►' : '❚ ❚'
}

const skip = ({ target: { dataset } }) => {
  // Learned!: video tag has a property called currentTime
  // and it can be changed directly
  video.currentTime += parseFloat(dataset.skip)
}

const handleRangeUpdate = ({ target: { name, value } }) => {
  // Learned!: video tag has properties called volume, playbackRate
  video[name] = value
}

const handleProgress = (event) => {
  const percent = (video.currentTime / video.duration) * 100
  // Learned!: video tag has a property called **flex-basis**
  progressBar.style.flexBasis = `${percent}%`
}

const scrub = (event) => {
  // Q: pageX, offsetX, clientX ... what is the difference between those?
  // what is relationship with units like px, vh, vw, %, rem, em?
  // -> 정리해서 블로그에 올리기
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = scrubTime
}

video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)
toggle.addEventListener('click', togglePlay)
skipButtons
  .forEach((button) => button.addEventListener('click', skip))
ranges
  .forEach((button) => button.addEventListener('input', handleRangeUpdate))

let mouseDown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (event) => mouseDown && scrub(event))
progress.addEventListener('mousedown', () => mouseDown = true)
progress.addEventListener('mouseup', () => mouseDown = false)
