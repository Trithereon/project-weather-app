// Precipitation formatting module.

export function formatPrecip(precip) {
  let value = precip;
  if (value) {
    return precip.toFixed(1);
  } else return "0";
}

export function formatPrecipType(precipType) {
  if (precipType) {
    return precipType;
  } else return "";
}
