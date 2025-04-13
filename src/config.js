require("dotenv").config();
const path = require("path");

module.exports = {
  openWeatherMap: {
    apiKey: process.env.API_KEY,
    baseUrl: "https://api.openweathermap.org/data/3.0/onecall",
    lang: "de",
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
    { name: "Nürnberg", lat: 49.4361997, lon: 10.968232 },
    { name: "Hannover", lat: 52.3797425, lon: 9.6790715 },
    { name: "Dresden", lat: 51.0769336, lon: 13.6077808 },
    { name: "Bremen", lat: 53.1201237, lon: 8.5714813 },
    { name: "Essen", lat: 51.4410057, lon: 6.8512133 },
    { name: "Dortmund", lat: 51.5079625, lon: 7.3878625 },
    { name: "Leipzig", lat: 51.3418814, lon: 12.22883 },
    { name: "Düsseldorf", lat: 51.238554, lon: 6.6495453 },
    { name: "Stuttgart", lat: 48.7792928, lon: 9.0948151 },
    { name: "Frankfurt am Main", lat: 50.1213155, lon: 8.4717587 },
    { name: "Köln", lat: 50.9578032, lon: 6.8025174 },
    { name: "München", lat: 48.137635, lon: 11.577627 },
    { name: "Hamburg", lat: 53.5586627, lon: 9.7630171 },
    { name: "Berlin", lat: 52.5222821, lon: 13.4015048 },
  ],
};
