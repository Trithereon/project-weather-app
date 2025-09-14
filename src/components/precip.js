// Precipitation formatting module.

export function formatPrecip(precip) {
  let value = precip;
  if (value) {
    return parseInt(precip) + "mm";
  } else return "0mm";
}

export function formatPrecipType(precipType) {
  if (precipType) {
    return precipType;
  } else return "";
}
