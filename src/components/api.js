// Weather API fetching module.

const API_KEY = "39U4T4JP9KSAU8CAEP5CYS87V";
const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

class WeatherStorage {
  constructor() {
    this._weatherData = null;
  }

  // Getter.
  get weatherData() {
    return this._weatherData;
  }

  // Fetch weather data.
  async fetchWeather(query, units = "metric", dates = "next15days") {
    // The line below is for use with the search input field. Testing will be in console only.
    // To use the line below, replace "query" with "searchInput" in the fetchWeather arguments.
    // const query = encodeURIComponent(searchInput.value.trim());
    try {
      const response = await fetch(
        `${BASE_URL}/${query}/${dates}?unitGroup=${units}&key=${API_KEY}&contentType=json`,
      );

      // Check if response is not OK (4xx or 5xx responses, such as 400 bad requests)
      // This triggers if the inputted city value is invalid, for example.
      if (!response.ok) {
        const errorText = await response.text(); // Get error message from response
        if (response.status == 400)
          alert("City name not found. Please check spelling and try again.");
        else
          alert(
            "Network error. Please see developer console for details, and try again later.",
          );
        throw new Error(`HTTP Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      this._weatherData = {
        city: data.resolvedAddress,
        currentConditions: data.currentConditions,
        days: data.days,
      };

      return this.weatherData;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export const weatherStorage = new WeatherStorage();

// Exposing this function to window for direct testing in console.
// window.fetchWeather = fetchWeather;
