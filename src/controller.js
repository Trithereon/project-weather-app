// Main controller module. It brings all the components together.

import "./styles.css";
import "modern-normalize/modern-normalize.css";
import { handleMenu, closeMenu } from "./components/menu.js";
import { handleSearch } from "./components/search.js";

// Handle Search.
const searchInput = document.getElementById("search");
searchInput.addEventListener("keydown", handleSearch);

// Trigger effects when menu settings are changed.
const dropdown = document.querySelector(".dropdown-list");
dropdown.addEventListener("change", handleMenu);

// Click away from menu to close it.
document.addEventListener("click", closeMenu);
