const BasePage = require('../../base/basePage');
const webdriver = require('selenium-webdriver');
const until = webdriver.until;
const base = new BasePage();

async function waitElemLocated(elLocator) {
  await base.driver.wait(until.elementLocated(elLocator), 10000);
  return base.driver.findElement(elLocator);
}
async function waitForElementDisplayed(element) {
  await base.driver.wait(until.elementIsVisible(element), 10000);
}

module.exports = { waitElemLocated, waitForElementDisplayed };
