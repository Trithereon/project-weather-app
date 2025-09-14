// Search module.

import { fetchWeather } from "./api";
import { updateDisplay } from "./display";

export function getQuery() {
  const searchInput = document.getElementById("search");
  const parsedQuery = _parseSearchInput(searchInput);
  return parsedQuery;
}

function _parseSearchInput(input) {
  const query = encodeURIComponent(input.value.trim());
  return query;
}

export function handleSearch(e) {
  if (e.key === "Enter") {
    const query = getQuery();
    const response = fetchWeather(query);
    response.then((data) => {
      // Tests below.
      // const time = trimTime(data.currentConditions.datetime);
      // const city = data.city;
      // const conditions = data.currentConditions.conditions;
      // console.log(time);
      // console.log(city);
      // console.log(conditions);
      // console.log(data.days[0].datetime);
      // console.log(data);
      // displayCard(data.days[0], "today");
      // displayAllCards(data,'', "tomorrow");
      // displayAllCards(data, '',"next7days");
      updateDisplay(data);
    });
  }
}
