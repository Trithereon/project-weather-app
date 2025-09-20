// Menu module.
import { updateDisplay } from "./display";
import { getSettings, updateSettings } from "./settings";
import { getQuery } from "./search";
import { weatherStorage } from "./api";

export function handleMenu(e) {
  const settings = getSettings().allSettings;
  const dateSettings = ["today", "tomorrow", "next7days", "next15days"];

  if (e.target.id === "metric") {
    settings.us = !settings.metric;
  } else if (e.target.id === "us") {
    settings.metric = !settings.us;
  } else {
    // This else statement is triggered by toggling a date setting.
    if (e.target.checked) {
      dateSettings.forEach((id) => {
        if (id !== e.target.id) {
          settings[id] = false; // Uncheck all other date settings.
        }
      });
    } else settings.today = true; // If all unchecked, check Today (default)
  }

  updateSettings(settings);

  // Fetch and display new data.
  const query = getQuery();
  if (!query) return; // If there is no query, exit function before fetching.
  const units = getSettings().checkedSettings[0];
  const response = weatherStorage.fetchWeather(query, units);
  response.then((data) => updateDisplay(data));
}

export function closeMenu(e) {
  const dropdown = document.querySelector("div.dropdown");
  const dropdownList = dropdown.querySelector("ul.dropdown-list");
  if (!dropdown.contains(e.target)) {
    dropdownList.classList.remove("visible");
  }
}
