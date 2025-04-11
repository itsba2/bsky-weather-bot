require("dotenv").config();
const path = require("path");

module.exports = {
  openWeatherMap: {
    apiKey: process.env.API_KEY,
    baseUrl: "https://api.openweathermap.org/data/3.0/onecall",
    units: "metric",
    exclude: ["current", "minutely", "hourly", "alerts"].join(),
  },
  bsky: {
    username: process.env.BLUESKY_USERNAME,
    password: process.env.BLUESKY_PASSWORD,
    service: "https://bsky.social",
  },
  paths: {
    forecasts: path.join(__dirname, "../forecasts"),
    logs: path.join(__dirname, "../logs"),
  },
  cronSchedule: "0 4 * * *",
  cities: [
    { name: "Munich", lat: 48.137635, lon: 11.577627 },
    { name: "Berlin", lat: 52.5222821, lon: 13.4015048 },
    { name: "Hamburg", lat: 53.5586627, lon: 9.7630171 },
    { name: "Cologne", lat: 50.9578032, lon: 6.8025174 },
    { name: "Frankfurt am Main", lat: 50.1213155, lon: 8.4717587 },
    { name: "Stuttgart", lat: 48.7792928, lon: 9.0948151 },
  ],
};
