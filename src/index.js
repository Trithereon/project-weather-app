import "./styles.css";
import "modern-normalize/modern-normalize.css";
import EventHandler from "./components/search.js";
import Dropdown from "@trithereon/dropdown";

document.querySelectorAll(".dropdown").forEach((dropdownContainer) => {
  new Dropdown(dropdownContainer);
});

EventHandler.init();
