const Page = require('./Page');
const search = require('./components/search-component');
const { waitElemLocated } = require('../helper/waiters');
const MailPage = require('./mailPage');

class CloudPage extends Page {
  get searchForm() {
    return $('.devsite-search-form');
  }
  get calculatorLink() {
    return $('=Google Cloud Pricing Calculator');
  }
  get iframe1() {
    return $('.devsite-article-body iframe');
  }
  get calculatorFrame() {
    return $('.cp-header iframe');
  }
  get instansesField() {
    return $('[name="ComputeEngineForm"] .ng-invalid-required');
  }
  get OSList() {
    return $('[name=ComputeEngineForm] md-select-value:first-of-type');
  }
  get OSElement() {
    return $('md-option[value="free"]');
  }
  get OSTextField() {
    return $('.ng-not-empty span');
  }
  get VMClassList() {
    return $('md-select[placeholder ="VM Class"]');
  }
  get VMClassRegular() {
    return $('.md-clickable [value="regular"]');
  }
  get VMClassPreemptible() {
    return $('.md-clickable [value="preemptible"]');
  }
  get VMClassTextField() {
    return $('[placeholder="VM Class"] span:first-of-type');
  }
  get machineTypeList() {
    return $('[placeholder="Instance type"] md-select-value');
  }
  get machineTypeElement() {
    return $('md-option[value="CP-COMPUTEENGINE-VMIMAGE-N1-STANDARD-8"');
  }
  get machineTypeTextField() {
    return $('[placeholder="Instance type"] span:first-of-type');
  }
  get gpuCheckbox() {
    return $('[name="ComputeEngineForm"] [aria-label="Add GPUs"]');
  }
  get gpuTypeList() {
    return $('[placeholder="GPU type"]');
  }
  get gpuTypeElement() {
    return $('[value="NVIDIA_TESLA_V100"]');
  }
  get gpuTypeTextField() {
    return $('[placeholder="GPU type"] span:first-of-type');
  }
  get gpuNumberList() {
    return $('[placeholder="Number of GPUs"] .md-select-value');
  }
  get gpuNumberElement() {
    return $('div.md-clickable md-option[value="1"]');
  }
  get gpuNumberTextField() {
    return $('[placeholder="Number of GPUs"] span:first-of-type');
  }
  get ssdTypeList() {
    return $(
      '[name = "ComputeEngineForm"] [placeholder="Local SSD"] md-select-value'
    );
  }
  get ssdType() {
    return $('div.md-clickable [value="2"]');
  }
  get selectedSsdType() {
    return $(
      '[name=ComputeEngineForm] [placeholder="Local SSD"] span:first-of-type'
    );
  }
  get locationList() {
    return $(
      '[name="ComputeEngineForm"] [placeholder = "Datacenter location"] md-select-value'
    );
  }
  get carolinaCountry() {
    return $('div.md-clickable [value="us-east1"]');
  }
  get selectedLocation() {
    return $(
      '[name=ComputeEngineForm] [placeholder="Datacenter location"] span:first-of-type'
    );
  }
  get committedUsageList() {
    return $('[name="ComputeEngineForm"] [placeholder="Committed usage"]');
  }
  get committedUsageElement() {
    return $('div.md-clickable [value="1"]');
  }
  get selectedCommitedUsageEl() {
    return $(
      '[name="ComputeEngineForm"] [placeholder="Committed usage"]  span:first-of-type'
    );
  }
  get addToEstimateBtn() {
    return $('[name="ComputeEngineForm"] button.cpc-button');
  }
  get emailEstimateBtn() {
    return $('#email_quote');
  }
  get emailForm() {
    return $('[name="emailForm"]');
  }
  get emailField() {
    return $('input[name="description"].ng-valid-email');
  }
  get sendEmailBtn() {
    return $('button[aria-label="Send Email"]');
  }
  get totalCost() {
    return $('.md-title>b');
  }
  async open() {
    await super.open('https://cloud.google.com/');
  }
  async getMail() {}

  async clickOnElem(element) {
    await (await waitElemLocated(element)).click();
  }

  async getSearchKeyswords() {
    const resultKeyword = await search('calculator');
    return resultKeyword;
  }
  async openCalculatorPage() {
    await this.clickOnElem(this.calculatorLink);
  }
  async getAccessToElements() {
    const iframe1 = await waitElemLocated(this.iframe1);
    await browser.switchToFrame(iframe1);
    const iframe2 = await waitElemLocated(this.calculatorFrame);
    await browser.switchToFrame(iframe2);
  }
  async inputInInstansesField(key) {
    await this.maximizeWindow();
    await this.getAccessToElements();
    const instansesField = await waitElemLocated(this.instansesField);
    await instansesField.addValue(key);
    const resultKey = await instansesField.getValue();
    return resultKey;
  }
  async maximizeWindow() {
    await browser.maximizeWindow();
  }
  async chooseOperatingSystem() {
    await this.clickOnElem(this.OSList);
    await this.clickOnElem(this.OSElement);
    return await this.OSTextField.getText();
  }
  async chooseVMClassPreemptible() {
    await this.clickOnElem(this.VMClassList);
    await this.clickOnElem(this.VMClassPreemptible);
    return await this.VMClassTextField.getText();
  }
  async chooseMachineType() {
    await this.clickOnElem(this.machineTypeList);
    await this.clickOnElem(this.machineTypeElement);
    return await this.machineTypeTextField.getText();
  }
  async chooseVMClassRegular() {
    await this.clickOnElem(this.VMClassList);
    await this.clickOnElem(this.VMClassRegular);
    await this.chooseMachineType();
  }
  async addGPU() {
    await this.clickOnElem(this.gpuCheckbox);
    await this.clickOnElem(this.gpuTypeList);
    await this.clickOnElem(this.gpuTypeElement);
    const gpuTypeTextField = await this.gpuTypeTextField;
    return await gpuTypeTextField.getText();
  }
  async chooseGPUNumber() {
    await this.clickOnElem(this.gpuNumberList);
    await this.clickOnElem(this.gpuNumberElement);
    const gpuNumberTextField = await this.gpuNumberTextField;
    return await gpuNumberTextField.getText();
  }
  async chooseSSDType() {
    await this.clickOnElem(this.ssdTypeList);
    await this.clickOnElem(this.ssdType);
    const selectedSsdType = await this.selectedSsdType;
    const result = await selectedSsdType.getText();
    return result;
  }
  async chooseLocation() {
    await this.clickOnElem(this.locationList);
    await this.clickOnElem(this.carolinaCountry);
    const selectedLocation = await this.selectedLocation;
    return await selectedLocation.getText();
  }
  async chooseComitedUsage() {
    await this.clickOnElem(this.committedUsageList);
    await this.clickOnElem(this.committedUsageElement);
    const selectedCommitedUsage = this.selectedCommitedUsageEl;
    return await selectedCommitedUsage.getText();
  }
  async addToExstimateBtnClick() {
    await this.clickOnElem(this.addToEstimateBtn);
    const totalCost = await waitElemLocated(this.totalCost);
    return await totalCost.getText();
  }
  async sendEmailToForm(email) {
    await browser.switchWindow('cloud.google.com');
    await this.getAccessToElements();
    await this.clickOnElem(this.emailEstimateBtn);
    const emailField = await waitElemLocated(this.emailField);
    await emailField.addValue(email);
    const resultEmail = await emailField.getValue();
    return resultEmail;
  }
  async sendLetterToEmail() {
    await this.clickOnElem(this.sendEmailBtn);
    await browser.switchWindow('yopmail.com');
  }
}
module.exports = new CloudPage();
