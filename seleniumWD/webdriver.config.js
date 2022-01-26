let chrome = require("selenium-webdriver/chrome");
const webdriver = require("selenium-webdriver");

const service = new chrome.ServiceBuilder(
  "./seleniumWD/node_modules/chromedriver/lib/chromedriver/chromedriver.exe"
  //   "../seleniumWD/node_modules/chromedriver/lib/chromedriver/chromedriver.exe"
).build();
chrome.setDefaultService(service);

module.exports = service;
