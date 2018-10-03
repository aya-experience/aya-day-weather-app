module.exports = {
  verbose: true,
  moduleFileExtensions: ['js', 'vue', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'jest-vue-preprocessor',
  },
  setupTestFrameworkScriptFile: './jest.setup.js',
  silent: false,
};
