// Main controller module. It brings all the components together.

import "./styles.css";
import "modern-normalize/modern-normalize.css";
import Search from "./components/search.js";

export default class Controller {
  constructor(rootElement) {
    // Initialize components.
    this.search = new Search(
      rootElement.getElementByID("search"),
      this.handleSearch,
    );
  }
}
