// Main controller module. It brings all the components together.
import { handleMenu, closeMenu } from "./components/menu.js";
import { handleSearch } from "./components/search.js";
import { handleChevron, toggleHourly } from "./components/display.js";

// Handle Search.
const searchInput = document.getElementById("search");
searchInput.addEventListener("keydown", handleSearch);

// Trigger effects when menu settings are changed.
const dropdown = document.querySelector(".dropdown-list");
dropdown.addEventListener("change", handleMenu);

// Click away from menu to close it.
document.addEventListener("click", closeMenu);

// Scroll through hourly data with chevrons.
document.addEventListener("click", (e) => {
  if (e.target.className === "chevron") handleChevron(e);
});

document.addEventListener("click", (e) => {
  if (e.target.className === "hourly-btn") toggleHourly(e);
});
