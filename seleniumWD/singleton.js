const service = require('./webdriver.config');
let chrome = require('selenium-webdriver/chrome');
const webdriver = require('selenium-webdriver');

const Singleton = (function () {
  const driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();
  return function () {
    return driver;
  };
})();

module.exports = Singleton();
