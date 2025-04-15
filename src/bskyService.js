const { AtpAgent: BskyAgent } = require("@atproto/api");
const logger = require("./logger.js");
const config = require("./config.js");

const agent = new BskyAgent({
  service: config.bsky.service,
});

async function loginToBsky() {
  try {
    await agent.login({
      identifier: config.bsky.identifier,
      password: config.bsky.password,
    });
    logger.info("Successfully logged in to Bluesky");
    return true;
  } catch (error) {
    logger.error(`Bluesky login error: ${error.message}`);
    return false;
  }
}

async function postToBsky(text) {
  try {
    if (!agent.session) {
      const loggedIn = await loginToBsky();
      if (!loggedIn) {
        throw new Error("Not logged in to Bluesky");
      }
    }

    await agent.post({
      text,
    });

    logger.info("Successfully posted to Bluesky");
    return true;
  } catch (error) {
    logger.error(`Error posting to Bluesky: ${error.message}`);
    return false;
  }
}

async function postCityForecasts(forecasts) {
  try {
    if (!agent.session) {
      const loggedIn = await loginToBsky();
      if (!loggedIn) {
        throw new Error("Not logged in to Bluesky");
      }
    }

    const results = [];

    // Post each city forecast separately
    for (const forecast of forecasts) {
      try {
        await agent.post({
          text: forecast,
        });
        logger.info(`Posted forecast for ${forecast.split("\n")[0]}`);
        results.push({ city: forecast.split("\n")[0], success: true });
      } catch (error) {
        logger.error(
          `Error posting forecast for ${forecast.split("\n")[0]}: ${
            error.message
          }`
        );
        results.push({
          city: forecast.split("\n")[0],
          success: false,
          error: error.message,
        });
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    return results;
  } catch (error) {
    logger.error(`Error in postCityForecasts: ${error.message}`);
    throw error;
  }
}

module.exports = {
  loginToBsky,
  postToBsky,
  postCityForecasts,
};
