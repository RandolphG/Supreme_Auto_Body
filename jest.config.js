/** @type {import('jest').Config} */
const config = {
  verbose: true,
  projects: [
    {
      displayName: "jsdom",
      testEnvironment: "jsdom",
      testMatch: ["<rootDir>/tests/jsdom/*.test.js"],
    },
    {
      displayName: "e2e",
      testEnvironment: "node",
      testMatch: ["<rootDir>/tests/e2e/*.test.js"],
    },
  ],
  testTimeout: 30000, // Puppeteer tests might need more time
  moduleFileExtensions: ["js"],
  moduleDirectories: ["public/classes", "public", "node_modules"],
};

module.exports = config;
