const BasePage = require('../base/basePage');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const search = require('./components/search-component');
const by = webdriver.By;

class googleCloudPage extends BasePage {
  constructor() {
    super();
    this.calculatorLink =
      '#___gcse_0 > div > div > div > div.gsc-wrapper > div.gsc-resultsbox-visible > div > div > div.gsc-expansionArea > div:nth-child(1) > div.gs-webResult.gs-result > div.gsc-thumbnail-inside > div > a';
    this.iframe1 = '#cloud-site > devsite-iframe > iframe';
    this.iframe2Id = '#myFrame';
    this.instansesFieldId = '#input_75';
    this.operatingSystemList = '#select_value_label_67';
    this.OSTextDiv = '#select_value_label_67 > span:nth-child(1) > div';
    this.listElement = '#select_option_77 > div.md-text';
    this.VMClassList = '#select_value_label_68';
    this.VMClassListItem = '#select_option_91';
    this.checkbox =
      '#mainForm > div:nth-child(3) > div > md-card > md-card-content > div > div:nth-child(1) > form > div:nth-child(12) > div.layout-column.flex-gt-sm-90.flex-80 > md-input-container > md-checkbox';
    this.machineTypeList = '#select_value_label_71';
    this.machineTypeListElem = '#select_option_418';
    this.searchField =
      'body > section > devsite-header > div > div.devsite-top-logo-row-wrapper-wrapper > div > div > div.devsite-top-logo-row-middle > devsite-search > form > div.devsite-search-container > div > input';
    this.gpuType = '#select_451';
    this.gpuElement = '#select_option_458';
    this.gpuNumber = '#select_value_label_450';
    this.element = '#select_option_462';
    this.element2 = '#select_value_label_412';
    this.ssdType = '#select_option_439';
    this.location = '#select_value_label_73';
    this.california = '#select_option_228';
    this.resultButton =
      '#mainForm > div:nth-child(3) > div > md-card > md-card-content > div > div:nth-child(1) > form > div.layout-align-end-start.layout-row > button';
  }
  //   get calculatorLink() {
  //     return '#___gcse_0 > div > div > div > div.gsc-wrapper > div.gsc-resultsbox-visible > div > div > div.gsc-expansionArea > div:nth-child(1) > div.gs-webResult.gs-result > div.gsc-thumbnail-inside > div > a';
  //   }
  //   get iframe1() {
  //     return '#cloud-site > devsite-iframe > iframe';
  //   }
  //   get iframe2Id() {
  //     return '#myFrame';
  //   }
  //   get instansesFieldId() {
  //     return '#input_75';
  //   }
  //   get operatingSystemList() {
  //     return '';
  //   }
  async getSearchingKeys(keywords) {
    const resultKeys = await search(keywords);
    // await this.driver.findElement(by.css(this.calculatorLink)).click();
    // const calculatorUrl = await this.getPageUrl();
    return resultKeys;
  }
  async searching(keywords) {
    // await search(keywords);
    // await driver.manage().setTimeouts({ implicit: 10000 });
    await this.driver.findElement(by.css(this.calculatorLink)).click();
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
  async getOperatingSystemElement() {
    // await this.getAccessTocalculatorForm();
    const OSlist = await this.driver
      .findElement(by.css(this.operatingSystemList))
      .click();
    await this.driver.findElement(by.css(this.listElement)).click();
    const osText = await this.driver
      .findElement(this.OSTextDiv)
      .getAttribute('value');
    // const result = await OSlist.getAttribute('value');
    return osText;
  }
}
module.exports = googleCloudPage;
