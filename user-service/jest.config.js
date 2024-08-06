module.exports = {
  transform: {
    "^.+\\.ts$": "babel-jest",
    "^.+\\.js$": "babel-jest",
  },
  testEnvironment: "node",
  setupFilesAfterEnv: ["./tests/setup.js"],
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/tests/**/*.test.js"],
  roots: ["<rootDir>/src", "<rootDir>/tests"],
};
