// Search module.

export default class Search {
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

  const img = document.querySelector('img');
    const searchInput = document.getElementById('search');
    const randomGif = document.getElementById('randomGif');
    const apiKey = 'GpJyHd2S5lJ6kTXrjq304awtmzGfQtLs';

    async function fetchGif(query = 'cats') {
     try { const response = await fetch(`khttps://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=${query}`, {mode: 'cors'})
      const gifData = await response.json();  
      img.src = gifData.data.images.original.url;
        
     } catch(err){
            console.log(err);
        };
    }


    
    function handleSearch(e) {
      if (e.key === 'Enter') {
        const query = encodeURIComponent(searchInput.value.trim()); // encodeURIComponent, so convert string for URL use. trim to remove leading or trailing spaces.
        fetchGif(query);
      }
    }

    searchInput.addEventListener('keydown', handleSearch);
}
