// Search module.

import { fetchWeather } from "./api";
import { displayCurrentWeather, displayHeader } from "./display";
import { trimTime } from "./time";

function _getQuery() {
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
    const query = _getQuery();
    const request = fetchWeather(query);
    request.then((data) => {
      // Render the header information line.
      displayHeader(data);

      // Tests below.
      const time = trimTime(data.currentConditions.datetime);
      const city = data.city;
      const conditions = data.currentConditions.conditions;
      console.log(time);
      console.log(city);
      console.log(conditions);
      console.log(data.days[0].datetime);
      console.log(data);

      displayCurrentWeather(data);
    });
  }
}
