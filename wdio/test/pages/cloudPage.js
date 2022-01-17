const Page = require('./Page');
const search = require('./components/search-component');

class CloudPage extends Page {
  get searchForm() {
    return $('.devsite-search-form');
  }
  get calculatorLink() {
    return $('=Google Cloud Pricing Calculator');
  }
  get iframe1() {
    return '#cloud-site > devsite-iframe > iframe';
  }
  get calculatorFrame() {
    return $('myFrame');
  }
  get instansesField() {
    return $('#input_75');
  }
  get OSList() {
    return $('#select_value_label_67');
  }
  get OSElement() {
    return $('#select_option_77');
  }
  get OSTextField() {
    return $('#select_value_label_67 > span:nth-child(1)');
  }
  get VMClassList() {
    return $('#select_value_label_68');
  }
  get VMClassRegular() {
    return $('#select_option_90');
  }
  get VMClassPreemptible() {
    return $('#select_option_91');
  }
  get VMClassTextField() {
    return $('#select_value_label_68 > span:nth-child(1)');
  }
  get machineTypeList() {
    return $('#select_value_label_71');
  }
  get machineTypeElement() {
    return $('#select_option_418');
  }
  get machineTypeTextField() {
    return $('#select_value_label_71 > span:nth-child(1)');
  }
  get gpuCheckbox() {
    return $(
      '#mainForm > div:nth-child(3) > div > md-card > md-card-content > div > div:nth-child(1) > form > div:nth-child(13) > div.layout-column.flex-gt-sm-90.flex-80 > md-input-container > md-checkbox'
    );
  }
  get gpuTypeList() {
    return $('#select_451');
  }
  get gpuTypeElement() {
    return $('#select_option_458');
  }
  get gpuTypeTextField() {
    return $(
      '/html/body/md-content/md-card/div/md-card-content[1]/div[2]/div/md-card/md-card-content/div/div[1]/form/div[12]/div/div[1]/div[1]/md-input-container[1]/md-select/md-select-value'
    );
  }
  get gpuNumberList() {
    return $('#select_value_label_450');
  }
  get gpuNumberElement() {
    return $('#select_option_462');
  }
  get gpuNumberTextField() {
    return $('#select_value_label_450 > span:nth-child(1)');
  }
  get ssdTypeList() {
    return $('#select_value_label_412');
  }
  get ssdType() {
    return $('#select_option_439');
  }
  get selectedSsdType() {
    return $('#select_value_label_412 > span:nth-child(1)');
  }
  get locationList() {
    return $('#select_value_label_73');
  }
  get carolinaCountry() {
    return $('#select_option_228');
  }
  get selectedLocation() {
    return $('#select_value_label_73 > span:nth-child(1)');
  }
  get committedUsageList() {
    return $('#select_115');
  }
  get committedUsageElement() {
    return $('#select_option_113');
  }
  get selectedCommitedUsageEl() {
    return $('#select_value_label_74 > span:nth-child(1)');
  }

  async open() {
    await super.open('https://cloud.google.com/');
  }

  async getSearchKeyswords() {
    const resultKeyword = await search('calculator');
    return resultKeyword;
  }
  async openCalculatorPage() {
    const calculatorLink = await this.calculatorLink;
    await calculatorLink.click();
  }
  async getAccessToElements() {
    const iframe1 = await browser.$(
      '//*[@id="cloud-site"]/devsite-iframe/iframe'
    );
    await browser.switchToFrame(iframe1);
    const iframe2 = await browser.$('#myFrame');
    await browser.switchToFrame(iframe2);
  }
  async inputInInstansesField(key) {
    await this.maximizeWindow();
    await this.getAccessToElements();
    const instansesField = await this.instansesField;
    await instansesField.addValue(key);
    const resultKey = await instansesField.getValue();
    return resultKey;
  }
  async maximizeWindow() {
    await browser.maximizeWindow();
  }
  async chooseOperatingSystem() {
    await this.OSList.click();
    await this.OSElement.click();
    return await this.OSTextField.getText();
  }
  async chooseVMClassPreemptible() {
    await this.VMClassList.click();
    await this.VMClassPreemptible.click();
    return await this.VMClassTextField.getText();
  }
  async chooseMachineType() {
    await this.machineTypeList.click();
    await this.machineTypeElement.click();
    return await this.machineTypeTextField.getText();
  }
  async chooseVMClassRegular() {
    await this.VMClassList.click();
    await this.VMClassRegular.click();
    await this.chooseMachineType();
  }
  async addGPU() {
    await this.gpuCheckbox.click();
    await this.gpuTypeList.click();
    const gpuTypeTextField = await this.gpuTypeTextField;
    const gpuTypeElement = await this.gpuTypeElement;
    await gpuTypeTextField.waitUntil(
      async function () {
        await gpuTypeElement.click();
        return (await gpuTypeTextField.getText()) === 'NVIDIA Tesla V100';
      },
      {
        timeout: 5000,
        timeoutMsg: 'expected text to be different after 5s',
      }
    );

    return await this.gpuTypeTextField.getText();
  }
  async chooseGPUNumber() {
    await this.gpuNumberList.click();
    const gpuNumberElement = await this.gpuNumberElement;
    const gpuNumberTextField = await this.gpuNumberTextField;
    await gpuNumberTextField.waitUntil(
      async function () {
        await gpuNumberElement.click();
        return (await gpuNumberTextField.getText()) === '1';
      },
      {
        timeout: 5000,
        timeoutMsg: 'expected text to be different after 5s',
      }
    );
    return await this.gpuNumberTextField.getText();
  }
  async chooseSSDType() {
    await this.ssdTypeList.click();
    const selectedSsdType = await this.selectedSsdType;
    const ssdType = await this.ssdType;
    await selectedSsdType.waitUntil(
      async function () {
        await ssdType.click();
        return (await selectedSsdType.getText()) === '2x375 GB';
      },
      {
        timeout: 5000,
        timeoutMsg: 'expected text to be different after 5s',
      }
    );
    return await this.selectedSsdType.getText();
  }
  async chooseLocation() {
    await this.locationList.click();
    const country = await this.carolinaCountry;
    const selectedLocation = await this.selectedLocation;
    await selectedLocation.waitUntil(
      async function () {
        await country.click();
        return (
          (await selectedLocation.getText()) === 'South Carolina (us-east1)'
        );
      },
      {
        timeout: 5000,
        timeoutMsg: 'expected text to be different after 5s',
      }
    );

    return await this.selectedLocation.getText();
  }
  async chooseComitedUsage() {
    await this.committedUsageList.click();
    const committedUsage = this.committedUsageElement;
    const selectedCommitedUsage = this.selectedCommitedUsageEl;
    await selectedCommitedUsage.waitUntil(
      async function () {
        await committedUsage.click();
        return (await selectedCommitedUsage.getText()) === '1 Year';
      },
      {
        timeout: 5000,
        timeoutMsg: 'expected text to be different after 5s',
      }
    );

    return await this.selectedCommitedUsageEl.getText();
  }
}
module.exports = new CloudPage();
