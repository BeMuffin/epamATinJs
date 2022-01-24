const BasePage = require('../base/basePage');
const webdriver = require('selenium-webdriver');
const search = require('./components/search-component');
const by = webdriver.By;
const mailPage = require('./mailPage');
const { waitElemLocated } = require('./helper/waiters');

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
    await (await waitElemLocated(this.calculatorLink)).click();
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
  async getOperatingSystemElement() {
    await (await waitElemLocated(this.operatingSystemList)).click();
    await this.findElement(this.listElement).click();
    const osText = await this.findElement(this.OSTextSpan).getText();
    return osText;
  }
  async selectVMtypePreemp() {
    await (await waitElemLocated(this.VMClassList)).click();
    await (await waitElemLocated(this.VMClassPreemptible)).click();
    const resultItem = await this.findElement(this.VMTextSpan).getText();
    return resultItem;
  }
  async selectVMtypeReg() {
    await (await waitElemLocated(this.VMClassList)).click();
    await (await waitElemLocated(this.VMClassRegular)).click();
    const resultItem = this.findElement(this.VMTextSpan).getText();
    return resultItem;
  }
  async selectMachinetype() {
    await (await waitElemLocated(this.machineTypeList)).click();
    await (await waitElemLocated(this.machineTypeListElem)).click();
    const resultItem = await this.findElement(this.machineTextSpan).getText();
    return resultItem;
  }
  async onGPUCheckbox() {
    let resultStatus;
    const checkbox = await waitElemLocated(this.addGPUCheckbox);
    await checkbox.click().then(async function () {
      resultStatus = await checkbox.getAttribute('aria-checked');
    });
    return resultStatus;
  }
  async selectGPUType() {
    await (await waitElemLocated(this.gpuType)).click();
    await (await waitElemLocated(this.gpuElement)).click();
    return await this.findElement(this.selectedType).getText();
  }
  async selectGPUNumber() {
    await (await waitElemLocated(this.gpuNumberList)).click();
    await (await waitElemLocated(this.gpuNumberElement)).click();
    const selectedNumber = await this.findElement(
      this.selectedNumber
    ).getText();
    return selectedNumber;
  }
  async selectLocalSSDType() {
    await (await waitElemLocated(this.ssdList)).click();
    await (await waitElemLocated(this.ssdType)).click();
    const selectedSSD = await this.findElement(this.selectedSSD).getText();
    return selectedSSD;
  }
  async selectLocation() {
    await (await waitElemLocated(this.location)).click();
    await (await waitElemLocated(this.country)).click();
    const selectedLocation = await this.findElement(
      this.selectedLocation
    ).getText();
    return selectedLocation;
  }
  async selectCommittedUsage() {
    await (await waitElemLocated(this.committedUsageList)).click();
    await (await waitElemLocated(this.committedUsageListEl)).click();
    const selectedElement = this.findElement(this.committedUsageSpan).getText();
    return selectedElement;
  }
  async addToExstimateBtnClick() {
    await (await waitElemLocated(this.resultButton)).click();
    const totalCost = await (await waitElemLocated(this.totalCost)).getText();
    return totalCost;
  }
}
module.exports = googleCloudPage;
