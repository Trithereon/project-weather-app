// Search module.

export function getQuery() {
  const searchInput = document.getElementById("search");
  const parsedQuery = _parseSearchInput(searchInput);
  return parsedQuery;
}

function _parseSearchInput(input) {
  const query = encodeURIComponent(input.value.trim());
  return query;
}
