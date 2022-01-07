// const until = webdriver.until;
const driver = require("./../../singleton");

class BasePage {
  constructor() {}
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
