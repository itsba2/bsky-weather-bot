const { getCityForecast } = require("../src/womService");

const MUNICH = { name: "München", lat: 48.137635, lon: 11.577627 };
describe("WeatherOpenMap API returned data", () => {
  let data;

  beforeAll(async () => {
    data = await getCityForecast(MUNICH);
  });

  test("Data is an object with { dt, temp, wind_speed, weather, clouds, pop }", () => {
    expect(data).toHaveFields([
      "dt",
      "temp",
      "wind_speed",
      "weather",
      "clouds",
      "pop",
    ]);
  });

  test("Data includes timestamp as number", () => {
    expect(data.dt).toBeNumber();
  });

  test("Data includes a temperature object with { max, min }", () => {
    expect(data.temp).toHaveFields(["max", "min"]);
  });

  test("Data includes wind speed as number", () => {
    expect(data.wind_speed).toBeNumber();
  });

  test("Data includes weather as array of objects with { description }", () => {
    expect(data.weather).toBeArrayOfObjectsWithFields(["description"]);
  });

  test("Data includes clouds as number", () => {
    expect(data.clouds).toBeNumber();
  });

  test("Data includes probability of precipitation as number", () => {
    expect(data.pop).toBeNumber();
  });
});
