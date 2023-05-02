module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.mjs$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!axios)/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
      babelConfig: true,
      diagnostics: true,
    },
  },
  extensionsToTreatAsEsm: [".ts"],
  testMatch: ["**/*.test.(ts|js)"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testRunner: "jest-circus/runner",
};
