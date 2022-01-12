const BasePage = require('./base/basePage');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const by = webdriver.By;

class PastbinPage extends BasePage {
  constructor() {
    super();
  }

  get pasteForm() {
    return '#postform-text';
  }
  get pasteExpiration() {
    return '#w0 > div.post-form__bottom > div.post-form__left > div.form-group.field-postform-expiration > div > span';
  }
  get pasteTitle() {
    return '#w0 > div.post-form__bottom > div.post-form__left > div.form-group.field-postform-name > label';
  }
  getPasteExpElementLocator(elementNumber) {
    switch (elementNumber) {
      case 1:
        return "//*[@class='select2-results__options']/li[1]";
      case 2:
        return "//*[@class='select2-results__options']/li[2]";
      case 3:
        return "//*[@class='select2-results__options']/li[3]";
      case 4:
        return "//*[@class='select2-results__options']/li[4]";
      case 5:
        return "//*[@class='select2-results__options']/li[5]";
      case 6:
        return "//*[@class='select2-results__options']/li[6]";
      case 7:
        return "//*[@class='select2-results__options']/li[7]";
      case 8:
        return "//*[@class='select2-results__options']/li[8]";
      case 9:
        return "//*[@class='select2-results__options']/li[9]";
      case 10:
        return "//*[@class='select2-results__options']/li[10]";
      default:
        return "//*[@class='select2-results__options']/li[1]";
    }
    return "//*[@class='select2-results__options']/li[3]";
    // return "//*[@class='select2-results__options']/li[4]";
  }
  get pasteExpElementText() {
    return '#select2-postform-expiration-container';
  }
  get syntaxHighlightingElText() {
    return '#select2-postform-format-container';
  }

  get pasteTitleField() {
    return '#postform-name';
  }
  get pasteTextArea() {
    return '#w0 > div.form-group.field-postform-text.required';
  }

  get footerByClass() {
    return 'top-footer';
  }
  get resultPageDiv() {
    return 'body > div.wrap > div.container > div.content > div.post-view > div.content__title.-no-border';
  }
  get settingsDiv() {
    return '#w0 > div.content__title.-paste';
  }
  get hightlightSwitch() {
    return '#w0 > div.content__title.-no-border > div > div > div';
  }
  get pasteTitleLabel() {
    return '#w0 > div.post-form__bottom > div.post-form__left > div.form-group.field-postform-name > label';
  }
  get dropdownSyntaxHighlight() {
    return '#w0 > div.post-form__bottom > div.post-form__left > div.form-group.field-postform-format > div';
  }
  dropdownSyntaxHighlightEl(elementNumber) {
    switch (elementNumber) {
      case 1:
        return "//*[@class='select2-results__options select2-results__options--nested']/li[1]";
      case 2:
        return "//*[@class='select2-results__options select2-results__options--nested']/li[2]";
      case 3:
        return "//*[@class='select2-results__options select2-results__options--nested']/li[3]";
      case 4:
        return "//*[@class='select2-results__options select2-results__options--nested']/li[4]";
      case 5:
        return "//*[@class='select2-results__options select2-results__options--nested']/li[5]";
      case 6:
        return "//*[@class='select2-results__options select2-results__options--nested']/li[6]";
      case 7:
        return "//*[@class='select2-results__options select2-results__options--nested']/li[7]";
      case 8:
        return "//*[@class='select2-results__options select2-results__options--nested']/li[8]";
      case 9:
        return "//*[@class='select2-results__options select2-results__options--nested']/li[9]";
      default:
        return "//*[@class='select2-results__options select2-results__options--nested']/li[1]";
    }
  }
  get newPasteBtn() {
    return '#w0 > div.post-form__bottom > div.post-form__left > div.form-group.form-btn-container > button';
  }
  get pasteTextAreaDiv() {
    return '#w0 > div.form-group.field-postform-text.required'; //div new Paste
  }
  async createPaste() {
    const scroll = await this.driver.findElement(
      by.className(this.footerByClass)
    );
    this.moveToElement(scroll);
    await this.driver.findElement(by.css(this.newPasteBtn)).click();
  }
  async checkNewPageLoaded() {
    const resultPageDiv = this.resultPageDiv;
    const result = await this.waitNewPageLoaded(resultPageDiv, 20000);
    return result;
  }

  async sendKeysToPastForm(key) {
    const pasteFormId = this.pasteForm;
    const pasteForm = await this.driver.findElement(by.css(pasteFormId));
    await pasteForm.sendKeys(key);
    const text = await pasteForm.getAttribute('value');
    await this.driver.sleep(2000);
    return text;
  }
  async sendKeysToTittleField() {
    const message = 'helloweb';
    const textResult = await this.sendKeysToElement(
      this.pasteTitleField,
      message
    );
    return textResult;
  }
  async getSyntaxHighlighDropDownEl(elementText) {
    const dropdownLocator = this.dropdownSyntaxHighlight;
    let dropdownElLocator;
    let text;
    const dropdownText = this.syntaxHighlightingElText;
    const scroll = await this.driver.findElement(by.css(this.pasteTitle));
    await this.moveToElement(scroll);
    switch (elementText) {
      case 'bash':
        dropdownElLocator = await this.dropdownSyntaxHighlightEl(1);
        await this.dropdown(dropdownLocator, dropdownElLocator);
        text = await this.driver.findElement(by.css(dropdownText)).getText();
        return text;
      case 'C':
        dropdownElLocator = await this.getPasteExpElementLocator(2);
        await this.dropdown(dropdownLocator, dropdownElLocator);
        text = await this.driver.findElement(by.css(dropdownText)).getText();
        return text;
      case 'C#':
        elementLocator = await this.getPasteExpElementLocator(3);
        await this.dropdown(locator, elementLocator);
        text = await this.driver
          .findElement(by.css(dropdownTextLocator))
          .getText();
        return text;
      case 'C++':
        elementLocator = this.getPasteExpElementLocator(4);
        await this.dropdown(locator, elementLocator);
        text = await this.driver
          .findElement(by.css(dropdownTextLocator))
          .getText();
        return text;
    }
  }

  async getSyntaxHighlighting() {
    const scroll = await this.driver.findElement(by.css(this.settingsDiv));
    await this.moveToElement(scroll);
    const newPasteDiv = await this.driver.findElement(
      by.css(this.pasteTextAreaDiv)
    );
    const language = await newPasteDiv.getAttribute('data-language');
    return language;
  }
  async switchHightlightSwitcher() {
    const scroll = await this.driver.findElement(by.css(this.settingsDiv));
    await this.moveToElement(scroll);
    await this.driver.findElement(by.css(this.hightlightSwitch)).click();
    const newPasteDiv = await this.driver.findElement(
      by.css(this.pasteTextAreaDiv)
    );
    const style = await newPasteDiv.getAttribute('style');
    // const language = await newPasteDiv.getAttribute('data-language');
    return style;
  }
  async dropdown(ddLocator, ddElementLocator) {
    await this.driver.findElement(by.css(ddLocator)).click();
    await this.driver.sleep(2000);
    await this.driver.findElement(by.xpath(ddElementLocator)).click();
  }

  async getPasteExpElement(elementText) {
    const locator = this.pasteExpiration; //dropdown
    let elementLocator; //db element
    let text;
    const scroll = await this.driver.findElement(by.css(this.pasteTitle)); //scroll
    const dropdownTextLocator = this.pasteExpElementText;
    await this.moveToElement(scroll);

    switch (elementText) {
      case 'never':
        elementLocator = await this.getPasteExpElementLocator(1);
        await this.dropdown(locator, elementLocator);
        text = await this.driver
          .findElement(by.css(dropdownTextLocator))
          .getText();
        return text;
      case 'after read':
        elementLocator = this.getPasteExpElementLocator(2);
        await this.dropdown(locator, elementLocator);
        text = await this.driver
          .findElement(by.css(dropdownTextLocator))
          .getText();
        return text;
      case '10 minutes':
        elementLocator = await this.getPasteExpElementLocator(3);
        await this.dropdown(locator, elementLocator);
        text = await this.driver
          .findElement(by.css(dropdownTextLocator))
          .getText();
        return text;
      case '1 hour':
        elementLocator = this.getPasteExpElementLocator(4);
        this.dropdown(locator, elementLocator);
        text = await this.driver
          .findElement(by.css(dropdownTextLocator))
          .getText();
        return text;
    }
  }

  async getPasteExpiration10Min(elementText) {
    const locator = this.pasteExpiration;
    const pasteExpElementLocator = this.pasteExpirationElement;
    const scrollLocator = this.pasteTitle;
    const dropdownTextLocator = this.pasteExpElementText;
    const scroll = await this.driver.findElement(by.css(scrollLocator));
    await this.moveToElement(scroll);
    await this.driver.findElement(by.css(locator)).click();
    // await this.driver.sleep(2000);
    const timer = await this.driver
      .findElement(by.xpath(pasteExpElementLocator))
      .click();
    const text = await this.driver
      .findElement(by.css(dropdownTextLocator))
      .getText();
    // const text = await timer.getText();
    return text;
  }

  async getPastFormText() {}
}

module.exports = PastbinPage;
