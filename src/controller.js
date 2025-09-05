// Main controller module. It brings all the components together.

import "./styles.css";
import "modern-normalize/modern-normalize.css";
import { getQuery } from "./components/search.js";
import { fetchWeather } from "./components/api.js";

const searchInput = document.getElementById("search");
searchInput.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.key === "Enter") {
    const query = getQuery();
    fetchWeather(query);
  }
});
