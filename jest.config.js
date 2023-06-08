const { defaults } = require("jest-config");

module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ["**/*.{ts,tsx}"],
  coverageDirectory: "coverage",
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
  testEnvironment: "jsdom",
};
