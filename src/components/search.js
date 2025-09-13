// Search module.
import { fetchWeather } from "./api";
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
    request.then((data) => console.log(data));
    request.then((data) =>
      console.log(trimTime(data.currentConditions.datetime)),
    );
  }
}
