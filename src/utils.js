const fs = require("fs");
const path = require("path");
const logger = require("./logger.js");
const config = require("./config.js");

if (!fs.existsSync(config.paths.forecasts)) {
  fs.mkdirSync(config.paths.forecasts, { recursive: true });
}

function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function formatForecast(city, forecast) {
  return `${city.name}
  ${formatDate(forecast.dt)}
  Max. temperature: ${forecast.temp.max.toFixed(1)}°C
  Min. temperature: ${forecast.temp.min.toFixed(1)}°C
  Chance of rain: ${(forecast.pop * 100).toFixed(0)}%
  Wind speed: ${forecast.wind_speed.toFixed(1)} m/s`;
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
