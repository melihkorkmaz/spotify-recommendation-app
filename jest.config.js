module.exports = {
  setupTestFrameworkScriptFile: './setupTests.js',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js?$',
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'node']
};
