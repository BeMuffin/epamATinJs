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
    this.calculatorLink = by.linkText('Google Cloud Pricing Calculator');
    this.iframe1 = by.css('.devsite-article-body iframe');
    this.iframe2Id = by.css('.cp-header iframe');
    this.instansesFieldId = by.css(
      '[name="ComputeEngineForm"] .ng-invalid-required'
    );
    this.operatingSystemList = by.css(
      '[name=ComputeEngineForm] md-select-value:first-of-type'
    );
    this.OSTextSpan = by.css('.ng-not-empty span');
    this.listElement = by.css('md-option[value="free"]');
    this.VMClassList = by.css('md-select[placeholder ="VM Class"]');
    this.VMClassRegular = by.css('.md-clickable [value="regular"]');
    this.VMClassPreemptible = by.css('.md-clickable [value="preemptible"]');
    this.VMTextSpan = by.css('[placeholder="VM Class"] span:first-of-type');
    this.checkbox = by.css(
      '[name="ComputeEngineForm"] [aria-label="Add GPUs"]'
    );
    this.machineTypeList = by.css(
      '[placeholder="Instance type"] md-select-value'
    );
    this.machineTypeListElem = by.css(
      'md-option[value="CP-COMPUTEENGINE-VMIMAGE-N1-STANDARD-8"]'
    );
    this.machineTextSpan = by.css(
      '[placeholder="Instance type"] span:first-of-type'
    );
    this.searchField = by.css('.devsite-search-form input');
    this.addGPUCheckbox = by.css(
      '[name="ComputeEngineForm"] [aria-label="Add GPUs"]'
    );
    this.gpuTypeSpan = by.css('[placeholder="GPU type"] span:first-of-type');
    this.gpuType = by.css('[placeholder="GPU type"]');
    this.gpuElement = by.css('[value="NVIDIA_TESLA_V100"]');
    this.gpuNumberList = by.css(
      '[placeholder="Number of GPUs"] .md-select-value'
    );
    this.gpuNumberElement = by.css('div.md-clickable md-option[value="1"]');
    this.ssdList = by.css(
      '[name = "ComputeEngineForm"] [placeholder="Local SSD"] md-select-value'
    );
    this.ssdType = by.css('div.md-clickable [value="2"]');
    this.location = by.css(
      '[name="ComputeEngineForm"] [placeholder = "Datacenter location"] md-select-value'
    );
    this.country = by.css('div.md-clickable [value="us-east1"]');
    this.committedUsageList = by.css(
      '[name="ComputeEngineForm"] [placeholder="Committed usage"]'
    );
    this.committedUsageListEl = by.css('div.md-clickable [value="1"]');
    this.committedUsageSpan = by.css(
      '[name="ComputeEngineForm"] [placeholder="Committed usage"]  span:first-of-type'
    );
    this.resultButton = by.css('[name="ComputeEngineForm"] button.cpc-button');
    this.emailButton = by.css('#email_quote');
    this.emailForm = by.css('[name="emailForm"]');
    this.emailField = by.css('input[name="description"].ng-valid-email');
    this.sendEmailBtn = by.css('button[aria-label="Send Email"]');
    this.selectedType = by.css('[placeholder="GPU type"] span:first-of-type');
    this.selectedNumber = by.css(
      '[placeholder="Number of GPUs"] span:first-of-type'
    );
    this.selectedSSD = by.css(
      '[name=ComputeEngineForm] [placeholder="Local SSD"] span:first-of-type'
    );
    this.selectedLocation = by.css(
      '[name=ComputeEngineForm] [placeholder="Datacenter location"] span:first-of-type'
    );
    this.totalCost = by.css('.md-title>b');
    this.scrollToCheckbox = by.css('.md-select-backdrop');
  }
  findElement(selector) {
    return this.driver.findElement(selector);
  }
  async getSearchingKeys(keywords) {
    const resultKeys = await search(keywords);
    return resultKeys;
  }
  async getEmailPage() {
    await this.findElement(this.emailButton).click();
    await this.switchToNewWindow('mailWindow');
    const myEmail = await this.mailPage.getEmail();
    return myEmail;
  }

  async getLetter(emailPage) {
    await this.findElement(this.sendEmailBtn).click();
    await this.switchToExistWindow(emailPage);
    const resultLetter = await this.mailPage.getLetter();
    return resultLetter;
  }
  async inputEmailInField(homePage, email) {
    await this.switchToExistWindow(homePage);
    await this.getAccessTocalculatorForm();
    const emailField = await this.findElement(this.emailField);
    await emailField.sendKeys(email);
    const resultEmail = await emailField.getAttribute('value');
    return resultEmail;
  }

  async searching() {
    await this.driver.sleep(10000);
    await this.findElement(this.calculatorLink).click();
    await this.driver.sleep(1000);
    const calculatorUrl = await this.getPageUrl();
    return calculatorUrl;
  }
  async getAccessTocalculatorForm() {
    await this.switchToFrame(this.findElement(this.iframe1));
    await this.switchToFrame(this.findElement(this.iframe2Id));
  }
  async sendKeyToInstansesFieldDiv(keys) {
    await this.getAccessTocalculatorForm();
    const instansesField = await this.findElement(this.instansesFieldId);
    await instansesField.sendKeys(keys);
    const resultKey = await instansesField.getAttribute('value');
    return resultKey;
  }
  async waitCalculatorLink() {
    await this.driver.wait(until.elementLocated());
  }
  async getOperatingSystemElement() {
    const OSlist = await this.findElement(this.operatingSystemList).click();
    await this.driver.sleep(1000);
    await this.findElement(this.listElement).click();
    const osText = await this.findElement(this.OSTextSpan).getText();
    return osText;
  }
  async selectVMtypePreemp() {
    await this.findElement(this.VMClassList).click();
    await this.driver.sleep(1000);
    await this.findElement(this.VMClassPreemptible).click();
    const resultItem = await this.findElement(this.VMTextSpan).getText();
    return resultItem;
  }
  async selectVMtypeReg() {
    await this.findElement(this.VMClassList).click();
    await this.driver.sleep(1000);
    await this.findElement(this.VMClassRegular).click();
    const resultItem = this.findElement(this.VMTextSpan).getText();
    return resultItem;
  }
  async selectMachinetype() {
    await this.findElement(this.machineTypeList).click();
    await this.driver.sleep(1000);
    await this.findElement(this.machineTypeListElem).click();
    const resultItem = await this.findElement(this.machineTextSpan).getText();
    return resultItem;
  }
  async onGPUCheckbox() {
    let resultStatus;
    const checkbox = await this.findElement(this.addGPUCheckbox);
    await checkbox.click().then(async function () {
      resultStatus = await checkbox.getAttribute('aria-checked');
    });
    return resultStatus;
  }
  async selectGPUType() {
    await this.findElement(this.gpuType).click();
    await this.driver.sleep(2000);
    await this.findElement(this.gpuElement).click();
    return await this.findElement(this.selectedType).getText();
  }
  async selectGPUNumber() {
    await this.findElement(this.gpuNumberList).click();
    await this.driver.sleep(2000);
    await this.findElement(this.gpuNumberElement).click();
    const selectedNumber = await this.findElement(
      this.selectedNumber
    ).getText();
    return selectedNumber;
  }
  async selectLocalSSDType() {
    await this.findElement(this.ssdList).click();
    await this.driver.sleep(2000);
    await this.findElement(this.ssdType).click();
    const selectedSSD = await this.findElement(this.selectedSSD).getText();
    return selectedSSD;
  }

  async selectLocation() {
    await this.findElement(this.location).click();
    await this.driver.sleep(2000);
    await this.findElement(this.country).click();
    const selectedLocation = await this.findElement(
      this.selectedLocation
    ).getText();
    return selectedLocation;
  }
  async selectCommittedUsage() {
    await this.findElement(this.committedUsageList).click();
    await this.driver.sleep(2000);
    await this.findElement(this.committedUsageListEl).click();
    const selectedElement = this.findElement(this.committedUsageSpan).getText();
    return selectedElement;
  }
  async addToExstimateBtnClick() {
    await this.findElement(this.resultButton).click();
    await this.driver.sleep(2000);
    const totalCost = await this.findElement(this.totalCost).getText();
    return totalCost;
  }
}
module.exports = googleCloudPage;
