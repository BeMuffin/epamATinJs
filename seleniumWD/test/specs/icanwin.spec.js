const PastbinPage = require('./../../pages/pastebinPage');
const chai = require('chai');
const { expect } = require('chai');

describe('E2E Pastbin page testing ', function () {
  let homePage;
  before(async function () {
    homePage = new PastbinPage();
  });

  it('should load Pastebin page ', async () => {
    await homePage.openPage('https://pastebin.com/');
    const url = await homePage.getPageUrl();
    await expect(url).be.equal('https://pastebin.com/');
  });
  it('should paste string to paste form ', async () => {
    const key = 'Hello from WebDriver';
    const text = await homePage.sendKeysToPastForm(key);
    await expect(text).to.equal(key);
  });
  it('should click on dropdown Paste Expiration and choose 10 minutes', async () => {
    const text = await homePage.getPasteExpElement('10 minutes');
    await expect(text).to.equal('10 Minutes');
  });
  it('should send keys to paste tittle field', async () => {
    const text = await homePage.sendKeysToTittleField();
    await expect(text).to.equal('helloweb');
  });

  it('should click on button Create New Paste and move to the created paste page', async () => {
    await homePage.createPaste();
    const result = await homePage.checkNewPageLoaded();
    await expect(result).to.equal(true);
  });

  after(async () => {
    await homePage.quit();
  });
});
