// const until = webdriver.until;
const driver = require('./../../singleton');
const webdriver = require('selenium-webdriver');
const by = webdriver.By;
const until = webdriver.until;

class BasePage {
  constructor() {
    this.driver = driver;
  }
  async openPage(path) {
    await driver.get(path);
  }
  async quit() {
    await driver.quit();
  }
  closePage() {
    return driver.close();
  }
  async getPageUrl() {
    const url = await driver.getCurrentUrl();
    return url;
  }
  async moveToElement(element) {
    const action = driver.actions({ async: true });
    await action.move({ origin: element }).pause(1000).perform();
  }
  async switchToFrame(frameLocator) {
    const frame = await driver.findElement(by.css(frameLocator));
    await driver.switchTo().frame(frame);
  }
  async clickOnElement(element) {
    await element.click();
  }
  async findElementXpath(locator) {
    return await driver.findElement(by.xpath(locator));
  }
  async findElementCss(locator) {
    return await driver.findElement(by.css(locator));
  }
  async findElementId(locator) {
    return await driver.findElement({ id: `${locator}` });
  }
  async findElementClass(locator) {
    return await driver.findElement(by.className(locator));
  }

  // async sleep(timeout) {
  //   await driver.sleep(timeout);
  // }
  async sendKeysToElement(locator, message) {
    const element = await driver.findElement(by.css(locator)); // this.driver
    await element.sendKeys(message);
    const text = await element.getAttribute('value');
    return text;
  }
  async implicitWait(timer) {
    await driver.manage().setTimeouts({ implicit: timer });
  }
  async maximizeWindow() {
    await driver.manage().window().maximize();
  }
  async waitNewPageLoaded(newPageElementLocator, timeout) {
    let result;
    await driver
      .wait(until.elementLocated(by.css(newPageElementLocator)), timeout)
      .then(async function () {
        result = await driver
          .findElement(by.css(newPageElementLocator))
          .isDisplayed();
      });
    return result;
  }
  async waitForElementDisplayed(locator, timeout) {
    let element;
    await driver.wait(until.elementLocated(locator), timeout).then(async () => {
      element = await driver.findElement(locator);
    });
    await driver
      .wait(until.elementIsVisible(element), timeout)
      .then(async () => {
        return driver.findElement(locator).isDisplayed();
      });
  }
}

module.exports = BasePage;
