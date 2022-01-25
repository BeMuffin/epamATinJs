const BasePage = require('./Page');
const { waitElemLocated } = require('../helper/waiters');
class PastbinPage extends BasePage {
  get pasteForm() {
    return $('.textarea');
  }
  get pasteTitle() {
    return $('.field-postform-name label');
  }
  get pasteExpDiv() {
    return $('.field-postform-expiration');
  }
  get pasteExpDropDown() {
    return $('.field-postform-expiration .select2');
  }
  pasteExpElem(elementNumber) {
    return $(`.select2-results__options li:nth-child(${elementNumber || 1})`);
  }
  get pasteExpTextField() {
    return $('.field-postform-expiration .select2-selection__rendered');
  }
  get syntaxHighlightingElText() {
    return $('.field-postform-format .select2-selection__rendered');
  }

  get pasteTitleField() {
    return $('.field-postform-name input');
  }
  get pasteTextArea() {
    return $('.required');
  }

  get footerByClass() {
    return $('.top-footer');
  }
  get resultPageDiv() {
    return $('.content__title ');
  }
  get settingsDiv() {
    return $('.-paste');
  }
  get hightlightSwitch() {
    return $('.toggle__control');
  }
  get dropdownSyntaxHighlight() {
    return $('.field-postform-format div');
  }
  dropdownSyntaxHighlightEl(elementNumber) {
    return $(
      `.select2-results__options--nested li:nth-child(${elementNumber || 1})`
    );
  }
  get newPasteBtn() {
    return $('.btn.-big');
  }
  get pasteTextAreaDiv() {
    return $('.field-postform-text');
  }

  async open() {
    await super.open('https://pastebin.com/');
  }
  async clickOnElem(element) {
    await (await waitElemLocated(element)).click();
  }
  async sendKeysToPastForm(key) {
    const pasteForm = await waitElemLocated(this.pasteForm);
    await pasteForm.addValue(key);
    const result = await pasteForm.getValue();
    return result;
  }

  async getPasteExpElem(elNumber) {
    const scroll = await waitElemLocated(this.pasteExpDiv);
    await scroll.scrollIntoView();
    await this.clickOnElem(this.pasteExpDropDown);
    await this.clickOnElem(this.pasteExpElem(elNumber));
    return await this.pasteExpTextField.getText();
  }

  async createPaste() {
    const scroll = await waitElemLocated(this.footerByClass);
    await scroll.scrollIntoView();
    await this.clickOnElem(this.newPasteBtn);
  }
  async checkNewPageLoaded() {
    await waitElemLocated(this.resultPageDiv);
  }
  async sendKeysToTittleField(message) {
    const titleField = await waitElemLocated(this.pasteTitleField);
    const textResult = await titleField.addValue(message);
    return textResult;
  }
  async getSyntaxHighlighDropDownEl(elNumber) {
    const scroll = await waitElemLocated(this.pasteTitle);
    await scroll.scrollIntoView();
    await this.clickOnElem(this.dropdownSyntaxHighlight);
    await this.clickOnElem(this.dropdownSyntaxHighlightEl(elNumber));
    return await this.syntaxHighlightingElText.getText();
  }

  async getSyntaxHighlighting() {
    const scroll = await waitElemLocated(this.settingsDiv);
    await scroll.scrollIntoView();
    const newPasteDiv = await waitElemLocated(this.pasteTextAreaDiv);
    return await newPasteDiv.getAttribute('data-language');
  }
  async switchHightlightSwitcher() {
    const scroll = await waitElemLocated(this.settingsDiv);
    await scroll.scrollIntoView();
    await this.clickOnElem(this.hightlightSwitch);
    const newPaste = await waitElemLocated(this.pasteTextArea);
    const style = await newPaste.getAttribute('style');
    return style;
  }
}

module.exports = new PastbinPage();
