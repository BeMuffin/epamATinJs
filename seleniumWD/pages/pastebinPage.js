const BasePage = require("./base/basePage");
const webdriver = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

class PastbinPage extends BasePage {
  constructor() {
    super();
  }

  get pasteForm() {
    return "postform-text";
  }
  get pasteExpiration() {
    return "#w0 > div.post-form__bottom > div.post-form__left > div.form-group.field-postform-expiration > div > span";
  }
  get pasteTitle() {
    return "#w0 > div.post-form__bottom > div.post-form__left > div.form-group.field-postform-name > label";
  }
  get pasteForm() {
    return "postform-text";
  }
  get pasteForm() {
    return "postform-text";
  }
  get pasteForm() {
    return "postform-text";
  }
  get pasteForm() {
    return "postform-text";
  }
  get pasteForm() {
    return "postform-text";
  }
  get pasteForm() {
    return "postform-text";
  }

  async sendKeysToElement() {
    await driver
      .findElement(webdriver.By.id("postform-text"))
      .sendKeys("Hello from WebDriver");
  }
}

module.exports = PastbinPage;
