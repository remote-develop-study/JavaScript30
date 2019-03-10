const panels = document.querySelectorAll('.panel')

function toggleOpen(event) {
  event.currentTarget.classList.toggle('open')
}

function toggleActive(event) {
  // thing I didn't know!
  // console.log(event.propertyName)
  if(event.propertyName.includes('flex')) {
    event.currentTarget.classList.toggle('open-active')
  }
}

panels.forEach((panel) => panel.addEventListener('click', toggleOpen))
panels.forEach((panel) => panel.addEventListener('transitionend', toggleActive))
