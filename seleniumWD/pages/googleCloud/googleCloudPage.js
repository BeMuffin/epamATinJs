const BasePage = require('../base/basePage');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const search = require('./components/search-component');
const by = webdriver.By;
const until = webdriver.until;
const mailPage = require('./mailPage');

class googleCloudPage extends BasePage {
  constructor() {
    super();
    this.mailPage = new mailPage();
    this.calculatorLink = 'Google Cloud Pricing Calculator';
    this.iframe1 = '#cloud-site > devsite-iframe > iframe';
    this.iframe2Id = '#myFrame';
    this.instansesFieldId = '#input_75';
    this.operatingSystemList = '#select_value_label_67';
    this.OSTextSpan = '#select_value_label_67 > span:nth-child(1)';
    this.listElement = 'select_option_77';
    this.VMClassList = '#select_value_label_68';
    this.VMClassRegular = '#select_option_90';
    this.VMClassPreemptible = '#select_option_91';
    this.VMTextSpan = '#select_value_label_68 > span:nth-child(1)';
    this.checkbox =
      '#mainForm > div:nth-child(3) > div > md-card > md-card-content > div > div:nth-child(1) > form > div:nth-child(12) > div.layout-column.flex-gt-sm-90.flex-80 > md-input-container > md-checkbox';
    this.machineTypeList = '#select_value_label_71';
    this.machineTypeListElem = '#select_option_418';
    this.machineTextSpan = '#select_value_label_71 > span:nth-child(1)';
    this.searchField =
      'body > section > devsite-header > div > div.devsite-top-logo-row-wrapper-wrapper > div > div > div.devsite-top-logo-row-middle > devsite-search > form > div.devsite-search-container > div > input';
    this.addGPUCheckbox =
      '#mainForm > div:nth-child(3) > div > md-card > md-card-content > div > div:nth-child(1) > form > div:nth-child(13) > div.layout-column.flex-gt-sm-90.flex-80 > md-input-container > md-checkbox';
    this.scrollToGPUType =
      '#mainForm > div:nth-child(3) > div > md-card > md-card-content > div > div:nth-child(1) > form > div.layout-align-end-start.layout-row';
    this.gpuTypeSpan = '#select_value_label_449 > span:nth-child(1)';
    this.gpuType = '#select_451';
    this.gpuElement = '#select_option_458';
    this.gpuNumberList = '#select_value_label_450';
    this.gpuNumberElement = '#select_option_462';
    this.ssdList = '#select_value_label_412';
    this.ssdType = '#select_option_439';
    this.location = '#select_value_label_73';
    this.country = '#select_option_228';
    this.committedUsageList = '#select_115';
    this.committedUsageListEl = '#select_option_113';
    this.committedUsageSpan = '#select_value_label_74 > span:nth-child(1)';

    this.resultButton =
      '#mainForm > div:nth-child(3) > div > md-card > md-card-content > div > div:nth-child(1) > form > div.layout-align-end-start.layout-row > button';
    this.emailButton = '#email_quote';
    this.emailForm = '#dialogContent_521 > form';
    this.emailField = '#input_529';
    this.sendEmailBtn =
      '#dialogContent_535 > form > md-dialog-actions > button.md-raised.md-primary.cpc-button.md-button.md-ink-ripple';
  }
  async getSearchingKeys(keywords) {
    const resultKeys = await search(keywords);
    return resultKeys;
  }
  async getEmailPage() {
    await this.driver.findElement(by.css(this.emailButton)).click();
    await this.switchToNewWindow('mailWindow');
    const myEmail = await this.mailPage.getEmail();
    return myEmail;
  }

  async sendOnEmail() {
    await this.driver.findElement(by.css(this.sendEmailBtn)).click();
  }
  async getLetter(emailPage) {
    await this.sendOnEmail();
    await this.switchToExistWindow(emailPage);
    const resultLetter = await this.mailPage.getLetter();
    return resultLetter;
  }
  async inputEmailInField(homePage, email) {
    await this.switchToExistWindow(homePage);
    await this.getAccessTocalculatorForm();
    // await this.driver.findElement(by.css(this.emailForm));
    const emailField = await this.driver.findElement(by.css(this.emailField));
    await emailField.sendKeys(email);
    const resultEmail = await emailField.getAttribute('value');
    return resultEmail;
  }

  async searching() {
    await this.driver.findElement(by.linkText(this.calculatorLink)).click();
    await this.driver.sleep(1000);
    const calculatorUrl = await this.getPageUrl();
    return calculatorUrl;
  }
  async getAccessTocalculatorForm() {
    await this.switchToFrame(this.iframe1);
    await this.switchToFrame(this.iframe2Id);
  }
  async sendKeyToInstansesFieldDiv(keys) {
    await this.getAccessTocalculatorForm();
    const instansesField = await this.driver.findElement(
      by.css(this.instansesFieldId)
    );
    await instansesField.sendKeys(keys);
    const resultKey = await instansesField.getAttribute('value');
    return resultKey;
  }
  async waitCalculatorLink() {
    await this.driver.wait(until.elementLocated());
  }
  async getOperatingSystemElement() {
    const OSlist = await this.driver
      .findElement(by.css(this.operatingSystemList))
      .click();
    await this.driver.sleep(1000);
    await this.driver.findElement(by.id(this.listElement)).click();
    const osText = await this.driver
      .findElement(by.css(this.OSTextSpan))
      .getText();
    return osText;
  }
  async selectVMtypePreemp() {
    await this.driver.findElement(by.css(this.VMClassList)).click();
    await this.driver.sleep(1000);
    await this.driver.findElement(by.css(this.VMClassPreemptible)).click();
    const resultItem = await this.driver
      .findElement(by.css(this.VMTextSpan))
      .getText();
    return resultItem;
  }
  async selectVMtypeReg() {
    await this.driver.findElement(by.css(this.VMClassList)).click();
    await this.driver.sleep(1000);
    await this.driver.findElement(by.css(this.VMClassRegular)).click();
    const resultItem = await this.driver
      .findElement(by.css(this.VMTextSpan))
      .getText();
    return resultItem;
  }
  async selectMachinetype() {
    await this.driver.findElement(by.css(this.machineTypeList)).click();
    await this.driver.sleep(1000);
    await this.driver.findElement(by.css(this.machineTypeListElem)).click();
    const resultItem = await this.driver
      .findElement(by.css(this.machineTextSpan))
      .getText();
    return resultItem;
  }
  async onGPUCheckbox() {
    const checkbox = await this.driver.findElement(by.css(this.addGPUCheckbox));
    await checkbox.click();
    const resultStatus = await checkbox.getAttribute('aria-checked');
    return resultStatus;
  }
  async selectGPUType() {
    await this.driver.findElement(by.css(this.gpuType)).click();
    await this.driver.sleep(2000);
    await this.driver.findElement(by.css(this.gpuElement)).click();
    const selectedType = await this.driver
      .findElement(by.css('#select_value_label_449 > span:nth-child(1)'))
      .getText();
    return selectedType;
  }
  async selectGPUNumber() {
    await this.driver.findElement(by.css(this.gpuNumberList)).click();
    await this.driver.sleep(2000);
    await this.driver.findElement(by.css(this.gpuNumberElement)).click();
    const selectedNumber = await this.driver
      .findElement(by.css('#select_value_label_450 > span:nth-child(1)'))
      .getText();
    return selectedNumber;
  }
  async selectLocalSSDType() {
    await this.driver.findElement(by.css(this.ssdList)).click();
    await this.driver.sleep(2000);
    await this.driver.findElement(by.css(this.ssdType)).click();
    const selectedSSD = await this.driver
      .findElement(by.css('#select_value_label_412 > span:nth-child(1)'))
      .getText();
    return selectedSSD;
  }

  async selectLocation() {
    await this.driver.findElement(by.css(this.location)).click();
    await this.driver.sleep(2000);
    await this.driver.findElement(by.css(this.country)).click();
    const selectedLocation = await this.driver
      .findElement(by.css('#select_value_label_73 > span:nth-child(1)'))
      .getText();
    return selectedLocation;
  }
  async selectCommittedUsage() {
    await this.driver.findElement(by.css(this.committedUsageList)).click();
    await this.driver.sleep(2000);
    await this.driver.findElement(by.css(this.committedUsageListEl)).click();
    const selectedElement = await this.driver
      .findElement(by.css(this.committedUsageSpan))
      .getText();
    return selectedElement;
  }
  async addToExstimateBtnClick() {
    await this.driver.findElement(by.css(this.resultButton)).click();
    await this.driver.sleep(2000);
    const totalCost = await this.driver
      .findElement(
        by.css(
          '#resultBlock > md-card > md-card-content > div > div > div > h2'
        )
      )
      .getText();
    //'Total Estimated Cost: USD 2,538.40 per 1 month'
    return totalCost;
  }
}
module.exports = googleCloudPage;
