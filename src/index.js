import "./styles.css";
import "modern-normalize/modern-normalize.css";
import Dropdown from "@trithereon/dropdown";
import "./controller.js";

// Initialize dropdown menu.
document.querySelectorAll(".dropdown").forEach((dropdownContainer) => {
  new Dropdown(dropdownContainer);
});

// Show styled HTML content, only after CSS and JS are loaded.
window.addEventListener("load", () => {
  document.body.style.visibility = "visible";
});
