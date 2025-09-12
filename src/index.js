import Dropdown from "@trithereon/dropdown";
import "./controller.js";

// Initialize dropdown menu.
document.querySelectorAll(".dropdown").forEach((dropdownContainer) => {
  new Dropdown(dropdownContainer);
});
