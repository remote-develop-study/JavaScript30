const $ = target => document.querySelector(target);

const $searchInput = $(".search");
const $suggestions = $(".suggestions");

const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

let cities = [];
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => (cities = data));

const findMatches = (word, cities) => {
  const regex = new RegExp(word, "gi");
  return cities.filter(({ city, state }) =>
    [city, state].some(v => v.match(regex))
  );
};

const numberWithCommas = n =>
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const displayMatches = ({ target: { value } }) => {
  $suggestions.innerHTML = findMatches(value, cities)
    .map(({ city, state, population }) => {
      const regex = new RegExp(value, "gi");
      const [cityName, stateName] = [city, state].map(v =>
        v.replace(regex, `<span class="hl">${value}</span>`)
      );
      return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(population)}</span>
      </li>
    `;
    })
    .join("");
};

$searchInput.addEventListener("change", displayMatches);
$searchInput.addEventListener("keyup", displayMatches);
