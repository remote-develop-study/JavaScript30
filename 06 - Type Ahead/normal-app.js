const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'
const inputTag = document.querySelector('form.search-form input.search')
const ulTag = document.querySelector('ul.suggestions')

const search = (event) => {
  const { target: { value: inputValue } } = event
  const lowerCaseInputValue = inputValue.toLowerCase()

  fetch(endpoint, {
    // query: lowerCaseInputValue
  })
    .then((responseBlob) => responseBlob.json())
    .then((cities) => cities
      .filter((city) =>
        city.city.toLowerCase().includes(lowerCaseInputValue) ||
        city.state.toLowerCase().includes(lowerCaseInputValue)
      )
      .map((city) => `
        <li>
          <span class="name">${city.city}, ${city.state}</span>
          <span class="population">${city.population}</span>
        </li>
      `)
      .join('')
    )
    .then((filteredCitiesString) => {
      ulTag.innerHTML = filteredCitiesString
      ulTag.classList.toggle('updated')
      const timeout = setTimeout(() => {
        ulTag.classList.toggle('updated')
        clearTimeout(timeout)
      }, 300)
    })
}

inputTag.addEventListener('input', search)
