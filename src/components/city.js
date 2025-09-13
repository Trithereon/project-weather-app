// City formatting module.

export function formatCity(city) {
  const formattedCity = city.charAt(0).toUpperCase() + city.slice(1);
  return formattedCity;
}
