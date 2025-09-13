// Menu module.
import { getSettings, setSettings } from "./settings";

export function handleMenu(e) {
  const settings = getSettings();
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
}

export function closeMenu(e) {
  const dropdown = document.querySelector("div.dropdown");
  const dropdownList = dropdown.querySelector("ul.dropdown-list");
  if (!dropdown.contains(e.target)) {
    dropdownList.classList.remove("visible");
  }
}
