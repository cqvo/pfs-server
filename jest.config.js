export default {
  setupFiles: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  moduleNameMapper: {
    '^#libs/(.*)$': '<rootDir>/src/libs/$1',
  },
};
