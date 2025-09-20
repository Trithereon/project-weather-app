// Displaying module for header and weather cards.
import { trimTime } from "./time";
import { formatCity } from "./city";
import { formatDate } from "./date";
import cityImg from "../img/location.svg";
import timeImg from "../img/time.svg";
import dateImg from "../img/date.svg";
import tempImg from "../img/temp.svg";
import rainImg from "../img/rain.svg";
import sunImg from "../img/sun.svg";
import moonImg from "../img/moon.svg";
import windImg from "../img/wind.svg";
import { formatPrecip, formatPrecipType } from "./precip";
import { getSettings } from "./settings";
import { loadIcon } from "./img";
import { formatWindDir } from "./wind";

// Evaluate requested display parameters and call for render of appropriate cards.
export function displayAllCards(data, unitsSetting, datesSetting) {
  const main = document.getElementById("main-content");
  // Reset main content.
  main.innerHTML = "";

  // Render the 'Current Weather' card.
  _displayCard(data.currentConditions, unitsSetting, "current");

  if (datesSetting === "today") {
    const dataSource = data.days[0];
    _displayCard(dataSource, unitsSetting, datesSetting);
  } else if (datesSetting === "tomorrow") {
    const dataSource = data.days[1];
    _displayCard(dataSource, unitsSetting, datesSetting);
  } else if (datesSetting === "next7days") {
    const daysToDisplay = data.days.slice(1, 8);
    daysToDisplay.forEach((day) => {
      _displayCard(day, unitsSetting, datesSetting);
    });
  } else if (datesSetting === "next15days") {
    const daysToDisplay = data.days.slice(1); // "From 1 to the end".
    daysToDisplay.forEach((day) => {
      _displayCard(day, unitsSetting, datesSetting);
    });
  }
}

// Render weather card.
function _displayCard(data, unitsSetting, datesSetting) {
  const d = data;
  let headerTitle;
  if (datesSetting === "current") headerTitle = "Current Weather";
  else if (datesSetting === "today") headerTitle = "Today";
  else if (datesSetting === "tomorrow") headerTitle = "Tomorrow";
  else if (datesSetting === "next7days" || datesSetting === "next15days")
    headerTitle = formatDate(d.datetime);
  else throw new Error("Invalid datesSetting used to call _displayCard");

  // Format data to be displayed.
  let tempUnit;
  let precipUnit;
  let windSpeedUnit;
  if (unitsSetting === "metric") {
    tempUnit = " °C";
    precipUnit = " mm";
    windSpeedUnit = " km/h";
  } else if (unitsSetting === "us") {
    tempUnit = " °F";
    precipUnit = " in";
    windSpeedUnit = " mph";
  } else throw new Error("Invalid unitsSetting caught in _displayCard");
  const temp = d.temp + tempUnit;
  const feelsLike = "feels like " + d.feelslike + tempUnit;
  const conditions = d.conditions;
  const precipProb = d.precipprob + "%";
  const precip = formatPrecip(d.precip) + precipUnit;
  const precipType = formatPrecipType(d.preciptype);
  const sunrise = trimTime(d.sunrise);
  const sunset = trimTime(d.sunset);
  const high = "High " + d.tempmax + tempUnit;
  const low = "/ Low " + d.tempmin + tempUnit;
  const windDir = formatWindDir(d.winddir);
  const wind = "Wind " + d.windspeed + windSpeedUnit + " " + windDir;

  // Create elements.
  const container = _createElement("div", "card-container");
  const headerLine = _createElement("div", "header-line");
  const header = _createElement("h2", "card-header", "", headerTitle);
  const tempContainer = _createElement("div", "temp-container");
  const imgTemp = _createImage("card-icon", tempImg, "temperature");
  const tempEl = _createElement("div", "temp", "temp", temp);
  const feelsLikeEl = _createElement(
    "div",
    "feels-like",
    "feelsLike",
    feelsLike,
  );
  const condEl = _createElement("div", "conditions", "conditions", conditions);
  const infoContainer = _createElement("div", "info-container");
  const infoLineP = _createElement("div", "info-line");
  const imgRain = _createImage("card-icon", rainImg, "precipitation");
  const precipTitle = _createElement("div", "data", "", "Precipitation");
  const precipProbEl = _createElement("div", "data", "precipProb", precipProb);
  const precipEl = _createElement("div", "data", "precip", precip);
  const precipTypeEl = _createElement("div", "data", "precipType", precipType);
  const infoLineS = _createElement("div", "info-line");
  const imgSun = _createImage("card-icon", sunImg, "sunrise");
  const sunriseTitle = _createElement("div", "data", "", "Sunrise");
  const sunriseEl = _createElement("div", "data", "sunrise", sunrise);
  const imgMoon = _createImage("card-icon", moonImg, "sunset");
  const sunsetTitle = _createElement("div", "data", "", "Sunset");
  const sunsetEl = _createElement("div", "data", "sunset", sunset);
  const highEl = _createElement("div", "data", "high", high);
  const lowEl = _createElement("div", "data", "low", low);
  const infoLineT = _createElement("div", "info-line");
  const imgWind = _createImage("card-icon", windImg, "wind");
  const windEl = _createElement("div", "data", "wind", wind);
  const infoLineW = _createElement("div", "info-line");

  // Create img element loaded with dynamic import of svg
  const iconPathPromise = loadIcon(d.icon);
  let imgIcon;
  iconPathPromise
    .then((svgPath) => {
      imgIcon = _createImage("weather-icon", svgPath, d.icon);
    })
    .then(() => {
      const headerLine = container.querySelector(".header-line");
      headerLine.appendChild(imgIcon);
    });

  // Assemble elements and append card to main-content.
  const main = document.getElementById("main-content");
  headerLine.appendChild(header);
  tempContainer.append(imgTemp, tempEl, feelsLikeEl);
  if (datesSetting != "current") infoLineT.append(highEl, lowEl); // Current weather has no tempmax nor tempmin
  infoLineP.append(imgRain, precipTitle, precipProbEl, precipEl, precipTypeEl);
  infoLineS.append(
    imgSun,
    sunriseTitle,
    sunriseEl,
    imgMoon,
    sunsetTitle,
    sunsetEl,
  );
  infoLineW.append(imgWind, windEl);
  infoContainer.append(infoLineP, infoLineS, infoLineW);
  container.append(headerLine, condEl, tempContainer, infoLineT, infoContainer);
  main.appendChild(container);
}

// Render the header bottom line data.
export function displayHeader(data) {
  const header = document.querySelector(".header-bottom-line");

  // Reset header bottom line.
  if (header) header.innerHTML = "";

  // Format data to be displayed.
  const city = formatCity(data.city);
  const time = trimTime(data.currentConditions.datetime);
  const date = formatDate(data.days[0].datetime);

  // Create elements.
  const imgCity = _createImage("card-icon", cityImg, "location");
  const cityEl = _createElement("div", "data", "city", city);
  const imgTime = _createImage("card-icon", timeImg, "time");
  const timeEl = _createElement("div", "data", "time", time);
  const imgDate = _createImage("card-icon", dateImg, "date");
  const dateEl = _createElement("div", "data", "date", date);

  // Append elements to header.
  header.append(imgCity, cityEl, imgTime, timeEl, imgDate, dateEl);
}

// Render the header and all weather cards.
export function updateDisplay(data) {
  const settings = getSettings().checkedSettings;
  displayHeader(data);
  // Using the spread syntax, to enumerate the members of the
  // array and pass them as arguments in this function call.
  displayAllCards(data, ...settings);
}

function _createElement(tag, classes, dataId, text) {
  const element = document.createElement(tag);
  if (classes) element.classList.add(...classes.split(" "));
  if (dataId) element.dataset.id = dataId;
  if (text) element.textContent = text;
  return element;
}

function _createImage(classes, src, alt) {
  const image = document.createElement("img");
  if (classes) image.classList.add(...classes.split(" "));
  if (src) image.src = src;
  if (alt) image.alt = alt;
  return image;
}
