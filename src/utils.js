const fs = require("fs");
const path = require("path");
const logger = require("./logger.js");
const config = require("./config.js");

if (!fs.existsSync(config.paths.forecasts)) {
  fs.mkdirSync(config.paths.forecasts, { recursive: true });
}

const WEEKDAYS = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
];

function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const weekDayId = date.getDay();
  const weekday = WEEKDAYS[weekDayId];
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year} - ${weekday}`;
}

function formatForecast(city, forecast) {
  return `#${city.name} - ${formatDate(forecast.dt)}
  Zusammenfassung: ${forecast.weather[0].description}
  Max. Temperatur: ${forecast.temp.max.toFixed(1)}°C
  Min. Temperatur: ${forecast.temp.min.toFixed(1)}°C
  Chance auf Regen: ${(forecast.pop * 100).toFixed(0)}%
  Wolken: ${forecast.clouds}%
  Windgeschwindigkeit: ${forecast.wind_speed.toFixed(1)} m/s`;
}

async function saveForecasts(content) {
  const date = new Date();
  const fileName = `forecast-${date.toISOString().split("T")[0]}.txt`;
  const filePath = path.join(config.paths.forecasts, fileName);

  try {
    await fs.promises.writeFile(filePath, content);
    logger.info(`Forecasts saved to ${filePath}`);
  } catch (error) {
    logger.error(`Error saving forecasts: ${error.message}`);
  }
}

module.exports = { formatDate, formatForecast, saveForecasts };
