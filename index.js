const { CronJob } = require("cron");
const logger = require("./src/logger.js");
const config = require("./src/config.js");
const { getCityForecast } = require("./src/womService.js");
const { formatForecast, saveForecasts } = require("./src/utils.js");
const { postCityForecasts } = require("./src/bskyService.js");

async function generateForecasts() {
  try {
    logger.info("Starting to generate weather forecasts");
    const forecastPromises = config.cities.map(async (city) => {
      const weatherData = await getCityForecast(city);
      if (!weatherData) {
        throw new Error(`Forecast data unavailable for ${city.name}`);
      }
      return formatForecast(city, weatherData);
    });

    const formattedForecasts = await Promise.all(forecastPromises);
    const allForecasts = formattedForecasts.join("\n\n");
    await saveForecasts(allForecasts);
    const bskyResults = await postCityForecasts(formattedForecasts);
    logger.info(
      `Posted ${bskyResults.filter((r) => r.success).length} of ${
        bskyResults.length
      } forecasts to Bluesky`
    );
    return allForecasts;
  } catch (error) {
    logger.error(`Error generating forecasts: ${error.message}`);
  }
}

const job = new CronJob(config.cronSchedule, async () => {
  logger.info(`Running scheduled forecast at ${new Date().toISOString()}`);
  try {
    await generateForecasts();
    logger.info("Scheduled forecast completed successfully");
  } catch (error) {
    logger.error(`Scheduled forecast failed: ${error.message}`);
  }
});

if (process.argv.includes("--now")) {
  logger.info("Running forecast generation immediately");
  generateForecasts()
    .then((forecasts) => {
      logger.info("Manual forecast generation completed successfully");
      console.log("\nGenerated Forecasts:\n");
      console.log(forecasts);
    })
    .catch((error) => {
      logger.error(`Test forecast generation failed: ${error.message}`);
      process.exit(1);
    });
} else {
  job.start();
}
