// Displaying module for header and weather cards.
import { trimTime } from "./time";
import { formatCity } from "./city";
import { formatDate } from "./date";
import cityImg from "../img/location.svg";
import timeImg from "../img/time.svg";
import dateImg from "../img/date.svg";

export function displayCard(data, datesSetting, unitsSetting) {
  const main = document.getElementById("main-content");

  let daysToDisplay = [];

  if (datesSetting === "today") {
    daysToDisplay = data.days[0];
  } else if (datesSetting === "tomorrow") {
    daysToDisplay = data.days[1];
  } else if (datesSetting === "next7days") {
    daysToDisplay = data.days.slice(1, 8);
  } else if (datesSetting === "next15days") {
    daysToDisplay = data.days.slice(1); // "From 1 to the end".
  }

  if (unitsSetting === "us") {
    // Send to unit conversion function in another module.
  }
}

export function displayHeader(data) {
  const header = document.querySelector(".header-bottom-line");

  // Reset header bottom line.
  if (header) header.innerHTML = "";

  const city = formatCity(data.city);
  const time = trimTime(data.currentConditions.datetime);
  const date = formatDate(data.days[0].datetime);

  const imgCity = _createImage("card-icon", cityImg, "location");
  const cityEl = _createElement("div", "data", "city", city);
  const imgTime = _createImage("card-icon", timeImg, "time");
  const timeEl = _createElement("div", "data", "time", time);
  const imgDate = _createImage("card-icon", dateImg, "date");
  const dateEl = _createElement("div", "data", "date", date);

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
