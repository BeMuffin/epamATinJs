const calculatorPage = require('../../pages/googleCloud/googleCloudPage');
const chai = require('chai');
const { expect } = require('chai');

describe('E2E Pastbin page testing ', function () {
  let homePage;
  before(async function () {
    homePage = new calculatorPage();
  });
  it('should load google cloud home page', async function () {
    const googleUrl = 'https://cloud.google.com/';
    await homePage.openPage(googleUrl);
    await homePage.maximizeWindow();
    const url = await homePage.getPageUrl();
    await expect(url).be.equal(googleUrl);
  });
  it('should input keyword "calculator" in search field and find calculator link ', async function () {
    const keywords = 'calculator';
    const resultKeys = await homePage.getSearchingKeys(keywords);
    await expect(resultKeys).to.equal(keywords);
  });
  it('should load calculator link ', async function () {
    const keywords = 'calculator';
    const resultUrl = await homePage.searching(keywords);
    await expect(resultUrl).to.equal(
      'https://cloud.google.com/products/calculator'
    );
  });
  it('should send key 4 to instanses field', async function () {
    const key = '4';
    const result = await homePage.sendKeyToInstansesFieldDiv(key);
    await expect(result).to.equal(key);
  });
  it('should get operating system from dropdown', async function () {
    await homePage.getOperatingSystemElement();
    // await expect(result).to.equal();
  });

  after(async () => {
    await homePage.quit();
  });
});
