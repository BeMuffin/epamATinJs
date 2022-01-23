const BasePage = require('./base/basePage');
const webdriver = require('selenium-webdriver');
const by = webdriver.By;

class PastbinPage extends BasePage {
  constructor() {
    super();
  }

  get pasteForm() {
    return this.driver.findElement(by.css('.textarea'));
  }
  get pasteTitle() {
    return this.driver.findElement(by.css('.field-postform-name label'));
  }
  get pasteExpDropDown() {
    return this.driver.findElement(
      by.css('.field-postform-expiration .select2')
    );
  }
  pasteExpElem(elementNumber) {
    return this.driver.findElement(
      by.css(`.select2-results__options li:nth-child(${elementNumber || 1})`)
    );
  }
  get pasteExpTextField() {
    return this.driver.findElement(
      by.css('.field-postform-expiration .select2-selection__rendered')
    );
  }
  get syntaxHighlightingElText() {
    return this.driver.findElement(
      by.css('.field-postform-format .select2-selection__rendered')
    );
  }

  get pasteTitleField() {
    return this.driver.findElement(by.css('.field-postform-name input'));
  }
  get pasteTextArea() {
    return this.driver.findElement(by.css('.required'));
  }

  get footerByClass() {
    return this.driver.findElement(by.className('top-footer'));
  }
  get resultPageDiv() {
    return by.css('.content__title ');
  }
  get settingsDiv() {
    return this.driver.findElement(by.css('.-paste'));
  }
  get hightlightSwitch() {
    return this.driver.findElement(by.css('.toggle__control'));
  }
  get dropdownSyntaxHighlight() {
    return this.driver.findElement(by.css('.field-postform-format div'));
  }
  dropdownSyntaxHighlightEl(elementNumber) {
    return this.driver.findElement(
      by.css(
        `.select2-results__options--nested li:nth-child(${elementNumber || 1})`
      )
    );
  }
  get newPasteBtn() {
    return this.driver.findElement(by.css('.btn.-big'));
  }
  get pasteTextAreaDiv() {
    return this.driver.findElement(by.css('.field-postform-text'));
  }

  async sendKeysToPastForm(key) {
    const pasteForm = await this.pasteForm;
    await pasteForm.sendKeys(key);
    const result = await pasteForm.getAttribute('value');
    return result;
  }

  async getPasteExpElem(elNumber) {
    const scroll = await this.pasteTitle;
    await this.moveToElement(scroll);
    await this.pasteExpDropDown.click();
    await this.pasteExpElem(elNumber).click();
    return await this.pasteExpTextField.getText();
  }

  async createPaste() {
    const scroll = await this.footerByClass;
    await this.moveToElement(scroll);
    await this.newPasteBtn.click();
  }
  async checkNewPageLoaded() {
    const resultPageDiv = this.resultPageDiv;
    const result = await this.waitNewPageLoaded(resultPageDiv, 20000);
    return result;
  }
  async sendKeysToTittleField(message) {
    const titleField = await this.pasteTitleField;
    const textResult = await this.sendKeysToElement(titleField, message);
    return textResult;
  }
  async getSyntaxHighlighDropDownEl(elNumber) {
    const scroll = this.pasteTitle;
    await this.moveToElement(scroll);
    await this.dropdownSyntaxHighlight.click();
    await this.dropdownSyntaxHighlightEl(elNumber).click();
    return await this.syntaxHighlightingElText.getText();
  }

  async getSyntaxHighlighting() {
    const scroll = this.settingsDiv;
    await this.moveToElement(scroll);
    const newPasteDiv = this.pasteTextAreaDiv;
    return await newPasteDiv.getAttribute('data-language');
  }
  async switchHightlightSwitcher() {
    const scroll = await this.settingsDiv;
    await this.moveToElement(scroll);
    await this.hightlightSwitch.click();
    const newPaste = await this.pasteTextArea;
    const style = await newPaste.getAttribute('style');
    return style;
  }
}

module.exports = PastbinPage;
