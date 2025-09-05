import Dropdown from "@trithereon/dropdown";
import Controller from "./controller.js";

// Initialize dropdown menu.
document.querySelectorAll(".dropdown").forEach((dropdownContainer) => {
  new Dropdown(dropdownContainer);
});

// Initialize main app controller.
// document.addEventListener("DOMContentLoaded", () => {
//   const rootElement = document.getElementById("main-wrapper");
//   new Controller(rootElement);
// });

const apiKey = "39U4T4JP9KSAU8CAEP5CYS87V";

async function fetchWeather(query, dates = "next7days", units = "metric") {
  // The line below is for use with the search input field. Testing will be in console only.
  // To use the line below, replace "query" with "searchInput" in the fetchWeather arguments.
  // const query = encodeURIComponent(searchInput.value.trim());

  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}/${dates}?unitGroup=${units}&key=${apiKey}&contentType=json`,
    );
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

// For console use, make this function global, bypassing webpack.
// window.fetchWeather = fetchWeather;
