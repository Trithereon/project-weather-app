// Search module.

export default class EventHandler {
  static actionHandlers = {
    search: EventHandler.handleSearch,
  };

  static init() {
    document.addEventListener("click", EventHandler.handleClick);
  }
  static handleClick(e) {
    const action = e.target.dataset.action;
    // Execute the associated function, passing the e onto the next function.
    if (action) EventHandler.actionHandlers[action](e);
    // If the clicked element has no data-action, then ignore the click.
    else return;
  }
  static handleSearch(e) {
    console.log("You clicked on the search button!");
  }
}
