const config = require("./config");
const logger = require("./logger");

const { baseUrl, units, exclude, apiKey } = config.openWeatherMap;

async function fetchWeatherForecast({ name, lat, lon }) {
  logger.info(`Fetching weather forecast for ${name}`);
  try {
    const url = `${baseUrl}?lat=${lat}&lon=${lon}&units=${units}&exclude=${exclude}&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    logger.http(`API Request: ${url.replace(apiKey, "API_KEY")}`);
    logger.info(`Successfully fetched forecast for ${name}`);
    return data;
  } catch (error) {
    logger.error(`Error fetching forecast for ${name}:`, error.message);
  }
}

async function getCityForecast(city) {
  try {
    const weatherData = await fetchWeatherForecast(city);
    return weatherData.daily[0];
  } catch (error) {
    logger.error(`Failed to get forecast for ${city.name}: ${error.message}`);
    return null;
  }
}

module.exports = { fetchWeatherForecast, getCityForecast };
