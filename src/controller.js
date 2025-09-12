// Main controller module. It brings all the components together.

import "./styles.css";
import "modern-normalize/modern-normalize.css";
import { getQuery } from "./components/search.js";
import { fetchWeather } from "./components/api.js";
import { getSettings, setSettings } from "./settings.js";

let datesSetting = "today";
let unitsSetting = "metric";

const searchInput = document.getElementById("search");
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const query = getQuery();
    console.log(fetchWeather(query, datesSetting, unitsSetting));
  }
});

const dropdown = document.querySelector(".dropdown-list");
dropdown.addEventListener("change", (e) => {
  const settings = getSettings();
  const dateSettings = ["today", "tomorrow", "next7days", "next15days"];

  if (e.target.id === "metric") {
    settings.us = !settings.metric;
  } else if (e.target.id === "us") {
    settings.metric = !settings.us;
  } else {
    // Triggered when toggling a date setting.
    if (e.target.checked) {
      dateSettings.forEach((id) => {
        if (id !== e.target.id) {
          settings[id] = false;
        }
      });
    } else settings.today = true; // If all unchecked, check Today (default)
  }

  if (e.target.id === "today") {
    console.log("Today checkbox was checked!");
  } else if (e.target.id === "tomorrow") {
    console.log("Tomorrow checkbox was checked!");
  } else if (e.target.id === "next7days") {
    console.log("Next 7 Days checkbox was checked!");
  } else if (e.target.id === "next15days") {
    console.log("Next 15 Days checkbox was checked!");
  }

  setSettings(settings);
});
