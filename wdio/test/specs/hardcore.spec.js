const GoogleCloud = require('./../pages/cloudPage');
const chai = require('chai');
// const { expect } = require('chai');

describe('E2E pricing calculator page testing ', function () {
  // before(async function () {});
  it('should load google cloud default page', async function () {
    await GoogleCloud.open();
    await expect(browser).toHaveUrl('https://cloud.google.com/');
  });
  it('should load check keywords in search field', async function () {
    const result = await GoogleCloud.getSearchKeyswords();
    await expect(result).toEqual('calculator');
  });
  it('should load calculator page', async function () {
    await GoogleCloud.openCalculatorPage();
    await expect(browser).toHaveUrlContaining(
      'https://cloud.google.com/products/calculator'
    );
  });
  it('should input key in instanses field', async function () {
    const result = await GoogleCloud.inputInInstansesField('4');
    await expect(result).toEqual('4');
  });
  it('should choose operation system from the list', async function () {
    const result = await GoogleCloud.chooseOperatingSystem();
    await expect(result).toEqual(
      'Free: Debian, CentOS, CoreOS, Ubuntu or BYOL (Bring Your Own License)'
    );
  });
  it('should choose VM class Preemptible from the list', async function () {
    const result = await GoogleCloud.chooseVMClassPreemptible();
    await expect(result).toEqual('Preemptible');
  });
  it('should choose machine type from the list', async function () {
    const result = await GoogleCloud.chooseMachineType();
    await expect(result).toEqual('n1-standard-8 (vCPUs: 8, RAM: 30GB)');
  });
  it('should switch on checkbox add GPU and choose gpu type', async function () {
    await GoogleCloud.chooseVMClassRegular();
    const result = await GoogleCloud.addGPU();
    await expect(result).toEqual('NVIDIA Tesla V100');
  });
  it('should choose GPU number from gpu number list', async function () {
    const result = await GoogleCloud.chooseGPUNumber();
    await expect(result).toEqual('1');
  });
  it('should choose ssd type from ssd type list', async function () {
    const result = await GoogleCloud.chooseSSDType();
    await expect(result).toEqual('2x375 GB');
  });
  it('should choose location carolina from location country list', async function () {
    const result = await GoogleCloud.chooseLocation();
    await expect(result).toEqual('South Carolina (us-east1)');
  });
  it('should select committed usage year from committed usage list ', async function () {
    const result = await GoogleCloud.chooseComitedUsage();
    await expect(result).toEqual('1 Year');
  });
});
