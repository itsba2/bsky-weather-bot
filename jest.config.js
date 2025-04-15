/** @type {import('jest').Config} */
const config = {
  verbose: true,
  setupFilesAfterEnv: ["./test/matchers.js"],
};

module.exports = config;
