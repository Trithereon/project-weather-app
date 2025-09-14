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
import { formatPrecip, formatPrecipType } from "./precip";

export function displayAllCards(data, datesSetting, unitsSetting) {
  const main = document.getElementById("main-content");
  // Reset main content.
  main.innerHTML = "";

  // Render the 'Current Weather' card.
  displayCard(data.currentConditions, "current", unitsSetting);

  if (datesSetting === "today") {
    const dataSource = data.days[0];
    displayCard(dataSource, datesSetting, unitsSetting);
  } else if (datesSetting === "tomorrow") {
    const dataSource = data.days[1];
    displayCard(dataSource, datesSetting, unitsSetting);
  } else if (datesSetting === "next7days") {
    const daysToDisplay = data.days.slice(1, 8);
    daysToDisplay.forEach((day) => {
      displayCard(day, datesSetting, unitsSetting);
    });
  } else if (datesSetting === "next15days") {
    const daysToDisplay = data.days.slice(1); // "From 1 to the end".
    daysToDisplay.forEach((day) => {
      displayCard(day, datesSetting, unitsSetting);
    });
  }

  // Convert units to US if selected.
  if (unitsSetting === "us") {
    // Send to unit conversion function in another module.
  }
}

export function displayCard(data, datesSetting, unitsSetting) {
  const d = data;
  let headerTitle;
  if (datesSetting === "current") headerTitle = "Current Weather";
  else if (datesSetting === "today") headerTitle = "Today";
  else if (datesSetting === "tomorrow") headerTitle = "Tomorrow";
  else if (datesSetting === "next7days" || datesSetting === "next15days")
    headerTitle = formatDate(d.datetime);
  else throw new Error("Invalid datesSetting used to call displayCard");

  // Format data to be displayed.
  const temp = d.temp + "°C";
  const feelsLike = "feels like " + d.feelslike + "°C";
  const conditions = d.conditions;
  const precipProb = d.precipprob + "%";
  const precip = formatPrecip(d.precip);
  const precipType = formatPrecipType(d.preciptype);
  const sunrise = trimTime(d.sunrise);
  const sunset = trimTime(d.sunset);

  // Create elements.
  const container = _createElement("div", "card-container");
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

  // Assemble elements and append card to main-content.
  const main = document.getElementById("main-content");
  tempContainer.append(imgTemp, tempEl, feelsLikeEl);
  infoLineP.append(imgRain, precipTitle, precipProbEl, precipEl, precipTypeEl);
  infoLineS.append(
    imgSun,
    sunriseTitle,
    sunriseEl,
    imgMoon,
    sunsetTitle,
    sunsetEl,
  );
  infoContainer.append(infoLineP, infoLineS);
  container.append(header, tempContainer, condEl, infoContainer);
  main.appendChild(container);

  if (unitsSetting === "us") {
    // Send to unit conversion function in another module.
  }
}

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
