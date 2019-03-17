import { fromEvent } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import {
  debounceTime,
  map,
  switchMap,
  distinctUntilChanged
} from 'rxjs/operators'

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'
const inputTag = document.querySelector('form.search-form input.search')
const ulTag = document.querySelector('ul.suggestions')

const inputStream = fromEvent(inputTag, 'input')
  .pipe(
    map((event) => event.target.value),
    map((inputValue) => inputValue.toLowerCase()),
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((lowerCaseInputValue) =>
      ajax(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // query: lowerCaseInputValue
      })
      .pipe(
        map((result) => result.response),
        map((cities) => cities
          .filter((city) =>
            city.city.toLowerCase().includes(lowerCaseInputValue) ||
            city.state.toLowerCase().includes(lowerCaseInputValue)
          )
          .map((city) => {
            const regex = new RegExp(lowerCaseInputValue, 'gi')
            const cityName = city.city
              .replace(
                regex,
                `<span class="hl">${lowerCaseInputValue}</span>`
              )
            const stateName = city.state
              .replace(
                regex,
                `<span class="hl">${lowerCaseInputValue}</span>`
              )
            const populationSeparatedWithComma = Number(city.population)
              .toLocaleString()

            return `
              <li>
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">${populationSeparatedWithComma}</span>
              </li>
            `
          })
          .join('')
        ),
      ),
    ),
  )

const subscribe = inputStream
  .subscribe((filteredCitiesString) => {
    ulTag.innerHTML = filteredCitiesString
    ulTag.classList.toggle('updated')
    const timeout = setTimeout(() => {
      ulTag.classList.toggle('updated')
      clearTimeout(timeout)
    }, 300)
  })
