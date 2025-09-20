// Search module.

import { weatherStorage } from "./api";
import { updateDisplay } from "./display";
import { getSettings } from "./settings";

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
    const units = getSettings().checkedSettings[0];
    const response = weatherStorage.fetchWeather(query, units);
    response.then((data) => updateDisplay(data));
  }
}
