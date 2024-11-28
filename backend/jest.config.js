module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  testMatch: ['**/tests/**/*.test.(js|ts|tsx)'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
};