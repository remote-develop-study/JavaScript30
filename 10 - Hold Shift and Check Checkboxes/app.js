const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]')

let lastChecked

function handleCheck(event) {
  let inBetween = false

  if (event.shiftKey && event.target.checked) {
    checkboxes.forEach((checkbox) => {
      if (checkbox === event.target || checkbox === lastChecked) {
        inBetween = !inBetween
      }

      if (inBetween) {
        checkbox.checked = true
      }
    })
  }

  lastChecked = event.target
}

checkboxes
  .forEach((checkbox) => checkbox.addEventListener('click', handleCheck))
