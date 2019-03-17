const canvasTag = document.querySelector('#draw')

let isDrawing = false
let lastX = 0
let lastY = 0
let hue = 0

canvasTag.width = window.innerWidth
canvasTag.height = window.innerHeight
const ctx = canvasTag.getContext('2d')
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round'
ctx.lineCap = 'round'

const draw = ({ offsetX, offsetY }) => {
  if (!isDrawing) {
    return
  }

  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
  ctx.beginPath()
  ctx.moveTo(lastX, lastY)
  ctx.lineTo(offsetX, offsetY)
  ctx.stroke()
  [lastX, lastY] = [offsetX, offsetY]

  if (hue > 0 && hue <= 360) {
    hue++
  } else {
    hue--
  }

  if (ctx.lineWidth > 0 && ctx.lineWidth <= 200) {
    ctx.lineWidth++
  } else {
    ctx.lineWidth--
  }
}

canvasTag.addEventListener('mousedown', ({ offsetX, offsetY }) => {
  isDrawing = true
  [lastX, lastY] = [offsetX, offsetY]
})
canvasTag.addEventListener('mouseup', () => isDrawing = false)
canvasTag.addEventListener('mouseout', () => isDrawing = false)
canvasTag.addEventListener('mousemove', draw)
