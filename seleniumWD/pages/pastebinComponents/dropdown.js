const BasePage = require('./base/basePage');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const by = webdriver.By;

async function dropdown(ddLocator, ddElementLocator) {
  await this.driver.findElement(by.css(ddLocator)).click();
  await this.driver.sleep(2000);
  await this.driver.findElement(by.xpath(ddElementLocator)).click();
}
