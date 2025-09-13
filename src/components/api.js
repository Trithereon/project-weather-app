// Weather API fetching module.
import { formatCity } from "./city";
const API_KEY = "39U4T4JP9KSAU8CAEP5CYS87V";
const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

export async function fetchWeather(
  query,
  dates = "next15days",
  units = "metric",
) {
  // The line below is for use with the search input field. Testing will be in console only.
  // To use the line below, replace "query" with "searchInput" in the fetchWeather arguments.
  // const query = encodeURIComponent(searchInput.value.trim());
  try {
    const response = await fetch(
      `${BASE_URL}/${query}/${dates}?unitGroup=${units}&key=${API_KEY}&contentType=json`,
    );
    const data = await response.json();
    const city = data.resolvedAddress;
    return {
      city: formatCity(city),
      currentConditions: data.currentConditions,
      days: data.days,
    };
  } catch (err) {
    console.log(err);
  }
}

window.fetchWeather = fetchWeather;
