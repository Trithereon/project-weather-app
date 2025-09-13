// Weather API fetching module.
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
    console.log(data);
    const city = data.resolvedAddress;
    return {
      city: _formatCity(city),
      temp: data.currentConditions.temp,
      feelsLike: data.currentConditions.feelslike,
      humidity: data.currentConditions.humidity,
      precip: data.currentConditions.precip,
      precipProb: data.currentConditions.precipprob,
      precipType: data.currentConditions.preciptype,
      sunrise: data.currentConditions.sunrise,
      sunset: data.currentConditions.sunset,
      uvIndex: data.currentConditions.uvindex,
      days: data.days,
    };
  } catch (err) {
    console.log(err);
  }
}

function _formatCity(city) {
  const formattedCity = city.charAt(0).toUpperCase() + city.slice(1);
  return formattedCity;
}

window.fetchWeather = fetchWeather;
