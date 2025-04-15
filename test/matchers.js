expect.extend({
  // to be number
  toBeNumber(received) {
    const pass = typeof received === "number" && !isNaN(received);
    return {
      pass,
      message: () =>
        `Expected ${this.utils.printReceived(received)} ${
          pass ? "not " : ""
        }to be a number`,
    };
  },
  // to have fıelds
  toHaveFields(received, fields) {
    const isObject =
      typeof received === "object" &&
      received !== null &&
      !Array.isArray(received);

    if (!isObject) {
      return {
        pass: false,
        message: () =>
          `Expected ${this.utils.printReceived(received)} to be an object`,
      };
    }

    const missingFields = fields.filter(
      (field) => !Object.prototype.hasOwnProperty.call(received, field)
    );

    const pass = missingFields.length === 0;

    return {
      pass,
      message: () =>
        pass
          ? `Expected object not to have fields ${fields.join(", ")}`
          : `Expected object to have fields ${fields.join(
              ", "
            )}, but missing ${missingFields.join(", ")}`,
    };
  },
  // to be array of objects with fields
  toBeArrayOfObjectsWithFields(received, fields) {
    const isArray = Array.isArray(received);

    if (!isArray) {
      return {
        pass: false,
        message: () =>
          `Expected ${this.utils.printReceived(received)} to be an array`,
      };
    }

    const invalidItems = received.filter(
      (item) =>
        typeof item !== "object" ||
        item === null ||
        !fields.every((field) =>
          Object.prototype.hasOwnProperty.call(item, field)
        )
    );

    const pass = invalidItems.length === 0;

    return {
      pass,
      message: () =>
        pass
          ? `Expected array not to contain objects with fields ${fields.join(
              ", "
            )}`
          : `Expected all items to be objects with fields ${fields.join(
              ", "
            )}, but found ${this.utils.printReceived(invalidItems)}`,
    };
  },
});
