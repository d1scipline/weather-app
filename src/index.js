import "./styles.css";

const API_KEY = "QMZBY6GXY32HGADG5X8S568GL";

async function getWeather(city) {
  let rawData = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&include=days%2Chours%2Ccurrent%2Calerts&key=${API_KEY}&contentType=json`,
  );
  let weatherData = await rawData.json();
  console.log(weatherData);
}

getWeather("Paris");
