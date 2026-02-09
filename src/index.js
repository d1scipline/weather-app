import "./styles.css";

const API_KEY = "QMZBY6GXY32HGADG5X8S568GL";
const searchButton = document.getElementById("city-search-btn");
const cityInput = document.getElementById("search-input");

async function getWeather(city) {
  try {
    let rawData = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&include=days%2Chours%2Ccurrent%2Calerts&key=${API_KEY}&contentType=json`,
    );
    let weatherData = await rawData.json();
    let weatherDataObject = {};
    weatherDataObject["city"] = weatherData.resolvedAddress;
    weatherDataObject["condition"] = weatherData.currentConditions.conditions;
    weatherDataObject["icon"] = weatherData.currentConditions.icon;
    weatherDataObject["temp"] = weatherData.currentConditions.temp;
    weatherDataObject["humidity"] = weatherData.currentConditions.humidity;
    weatherDataObject["pressure"] = weatherData.currentConditions.pressure;
    weatherDataObject["feels_like"] = weatherData.currentConditions.feelslike;
    weatherDataObject["wind"] = weatherData.currentConditions.windspeed;
    console.log(weatherDataObject);
    console.log(weatherData);
  } catch {
    console.log("Error");
  }
}

searchButton.addEventListener("click", () => {
  getWeather(cityInput.value);
  cityInput.value = "";
});
