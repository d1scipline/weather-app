import "./styles.css";

import loadingIcon from "./assets/ui-icons/emoji-blink-left.svg";
import errorIcon from "./assets/ui-icons/warning-triangle.svg";
import humidityIcon from "./assets/ui-icons/droplet.svg";
import feelsLikeIcon from "./assets/ui-icons/feels_like.svg";
import windIcon from "./assets/ui-icons/wind.svg";

const daysList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const weatherIcons = {};
const weatherIconNames = [
  "clear-day",
  "clear-night",
  "cloudy",
  "fog",
  "partly-cloudy-day",
  "partly-cloudy-night",
  "rain",
  "snow",
  "wind",
];

for (let i = 0; i < weatherIconNames.length; i++) {
  import(`./assets/weather-icons/${weatherIconNames[i]}.svg`).then((module) => {
    weatherIcons[weatherIconNames[i]] = module.default;
  });
}

const API_KEY = "QMZBY6GXY32HGADG5X8S568GL";
const searchButton = document.getElementById("city-search-btn");
const cityInput = document.getElementById("search-input");

const dataContainer = document.getElementById("data-container");

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function convertToC(temp) {
  return Math.round(((temp - 32) * 5) / 9);
}

function changeFC() {
  console.log("changed");
}

function convertMilesToKm(miles) {
  const km = miles * 1.60934;
  return km.toFixed(1);
}

function renderCity(city) {
  let cityTitle = document.createElement("h1");
  cityTitle.setAttribute("class", "city");
  cityTitle.innerText = city;
  dataContainer.appendChild(cityTitle);
  dataContainer.appendChild(document.createElement("hr"));
}

function renderDisplayContainer(temp, format, icon, condition) {
  if (format == "c") {
    var temparature = convertToC(temp);
    var sign = "°C";
  } else {
    var temparature = Math.round(temp);
    var sign = "°F";
  }

  let containerDiv = document.createElement("div");
  containerDiv.setAttribute("class", "display-container");

  let temparatureContainer = document.createElement("div");
  temparatureContainer.setAttribute("class", "temparature-display");

  containerDiv.appendChild(temparatureContainer);

  let temparatureText = document.createElement("div");
  temparatureText.setAttribute("class", "temparature-text");

  temparatureContainer.appendChild(temparatureText);

  let temparatureNumber = document.createElement("div");
  temparatureNumber.setAttribute("class", "temparature-number");
  temparatureNumber.innerText = temparature.toString();

  temparatureText.appendChild(temparatureNumber);

  let temparatureDegree = document.createElement("div");
  temparatureDegree.setAttribute("class", "temparature-degree");
  temparatureDegree.innerText = sign;

  temparatureText.appendChild(temparatureDegree);

  let weatherStatus = document.createElement("span");
  weatherStatus.setAttribute("class", "weather-status");
  weatherStatus.innerText = condition;

  temparatureContainer.appendChild(weatherStatus);

  let iconDisplay = document.createElement("div");
  iconDisplay.setAttribute("class", "icon-display");
  let iconImg = document.createElement("img");
  iconImg.setAttribute("class", "weather-icon");
  iconImg.src = weatherIcons[icon];

  iconDisplay.appendChild(iconImg);
  containerDiv.appendChild(iconDisplay);

  let cfButtonDiv = document.createElement("div");
  cfButtonDiv.setAttribute("class", "cf-button");
  let cfButton = document.createElement("button");
  cfButton.setAttribute("id", "cf-button");
  cfButton.innerText = "°C/°F";
  cfButton.addEventListener("click", changeFC);
  cfButtonDiv.appendChild(cfButton);

  containerDiv.appendChild(cfButtonDiv);

  dataContainer.appendChild(containerDiv);
  dataContainer.appendChild(document.createElement("hr"));
}

function renderDetailsContainer(humidity, feels_like, wind, format) {
  let detailsContainer = document.createElement("div");
  detailsContainer.setAttribute("class", "details-container");

  if (format == "c") {
    var sign = "°C";
    var temp = convertToC(feels_like);
    var windSpeed = convertMilesToKm(wind);
    var unit = "km/h";
  } else {
    var sign = "°F";
    var temp = Math.round(feels_like);
    var windSpeed = wind;
    var unit = "mph";
  }

  let humidityCard = document.createElement("div");
  humidityCard.setAttribute("class", "detail-card humidity");
  let humidityImg = document.createElement("img");
  humidityImg.setAttribute("src", humidityIcon);
  humidityCard.appendChild(humidityImg);
  let humidityText = document.createElement("span");
  humidityText.setAttribute("id", "humidity-text");
  humidityText.innerText = `Humidity: ${humidity}%`;
  humidityCard.appendChild(humidityText);
  detailsContainer.appendChild(humidityCard);

  let feelsLikeCard = document.createElement("div");
  feelsLikeCard.setAttribute("class", "detail-card feels-like");
  let feelsLikeImg = document.createElement("img");
  feelsLikeImg.setAttribute("src", feelsLikeIcon);
  feelsLikeCard.appendChild(feelsLikeImg);
  let feelsLikeText = document.createElement("span");
  feelsLikeText.setAttribute("id", "feels-like-text");
  feelsLikeText.innerText = `Feels like: ${temp}${sign}`;
  feelsLikeCard.appendChild(feelsLikeText);
  detailsContainer.appendChild(feelsLikeCard);

  let windCard = document.createElement("div");
  windCard.setAttribute("class", "detail-card wind");
  let windImg = document.createElement("img");
  windImg.setAttribute("src", windIcon);
  windCard.appendChild(windImg);
  let windText = document.createElement("span");
  windText.setAttribute("id", "wind-text");
  windText.innerText = `${windSpeed} ${unit}`;
  windCard.appendChild(windText);
  detailsContainer.appendChild(windCard);

  dataContainer.appendChild(detailsContainer);
  dataContainer.appendChild(document.createElement("hr"));
}

function dayCardCreator(time, icon, tempMin, tempMax, format) {
  var date = new Date(time * 1000);
  var day = daysList[date.getDay()];
  let dayCard = document.createElement("div");
  dayCard.setAttribute("class", "day-card");
  let dayText = document.createElement("span");
  dayText.setAttribute("class", "day-text");
  dayText.innerText = day;
  dayCard.appendChild(dayText);
  let dayImg = document.createElement("img");
  dayImg.setAttribute("class", "day-icon");
  dayImg.setAttribute("src", weatherIcons[icon]);
  dayCard.appendChild(dayImg);
  let dayTemp = document.createElement("span");
  dayTemp.setAttribute("class", "day-temp");
  if (format == "c") {
    dayTemp.innerText = `${convertToC(tempMax)}°/${convertToC(tempMin)}°`;
  } else {
    dayTemp.innerText = `${Math.round(tempMax)}°/${Math.round(tempMin)}°`;
  }
  dayCard.appendChild(dayTemp);
  return dayCard;
}

function renderDays(days, format) {
  let nextDaysContainer = document.createElement("div");
  nextDaysContainer.setAttribute("class", "next-days-container");
  for (let i = 0; i < days.length; i++) {
    let day = days[i];
    let dayCard = dayCardCreator(
      day.datetimeEpoch,
      day.icon,
      day.tempmin,
      day.tempmax,
      format,
    );
    nextDaysContainer.appendChild(dayCard);
  }
  dataContainer.appendChild(nextDaysContainer);
}

function clearScreen() {
  dataContainer.innerHTML = "";
}

function displayData(dataObject, format = "f") {
  clearScreen();
  renderCity(dataObject.city);
  renderDisplayContainer(
    dataObject.temp,
    format,
    dataObject.icon,
    dataObject.condition,
  );
  renderDetailsContainer(
    dataObject.humidity,
    dataObject.feels_like,
    dataObject.wind,
    format,
  );
  renderDays(dataObject.days, format);
}

function loadingScreen() {
  clearScreen();
  let div = document.createElement("div");
  div.setAttribute("class", "loading-div");
  let image = document.createElement("img");
  image.setAttribute("class", "loading-img");
  image.setAttribute("src", loadingIcon);
  div.appendChild(image);
  let span = document.createElement("span");
  span.setAttribute("class", "loading-span");
  span.innerText = "Loading weather...";
  div.appendChild(span);
  dataContainer.appendChild(div);
}

function errorScreen() {
  clearScreen();
  let div = document.createElement("div");
  div.setAttribute("class", "error-div");
  let image = document.createElement("img");
  image.setAttribute("class", "error-img");
  image.setAttribute("src", errorIcon);
  div.appendChild(image);
  let span = document.createElement("span");
  span.setAttribute("class", "error-span");
  span.innerText = "An error has occured.";
  div.appendChild(span);
  dataContainer.appendChild(div);
}

async function getWeather(city) {
  loadingScreen();
  try {
    let rawData = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&include=days%2Chours%2Ccurrent%2Calerts&key=${API_KEY}&contentType=json`,
    );
    let weatherData = await rawData.json();
    let weatherDataObject = {};
    weatherDataObject["city"] = toTitleCase(weatherData.resolvedAddress);
    weatherDataObject["condition"] = weatherData.currentConditions.conditions;
    weatherDataObject["icon"] = weatherData.currentConditions.icon;
    weatherDataObject["temp"] = weatherData.currentConditions.temp;
    weatherDataObject["humidity"] = weatherData.currentConditions.humidity;
    weatherDataObject["feels_like"] = weatherData.currentConditions.feelslike;
    weatherDataObject["wind"] = weatherData.currentConditions.windspeed;
    weatherDataObject["days"] = weatherData.days.slice(1, 6);
    displayData(weatherDataObject, cityInput.getAttribute("format"));
  } catch {
    errorScreen();
  }
}

searchButton.addEventListener("click", () => {
  if (cityInput.value.trim() == "" || cityInput.value.trim() == null) {
    cityInput.setCustomValidity("You must enter a city name!");
    cityInput.reportValidity();
  } else {
    console.log(cityInput.value);
    getWeather(cityInput.value);
    cityInput.value = "";
  }
});

document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if (cityInput.value.trim() == "" || cityInput.value.trim() == null) {
      cityInput.setCustomValidity("You must enter a city name!");
      cityInput.reportValidity();
    } else {
      console.log(cityInput.value);
      getWeather(cityInput.value);
      cityInput.value = "";
    }
  }
});

cityInput.addEventListener("input", () => {
  cityInput.setCustomValidity("");
});
