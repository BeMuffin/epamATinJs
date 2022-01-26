const PastbinPage = require('../pages/pastebinPage');

describe('E2E Pastbin page testing ', function () {
  it('should load Pastebin page ', async () => {
    await PastbinPage.open();
    await PastbinPage.windowMaximize();
    await expect(browser).toHaveUrl('https://pastebin.com/');
  });
  it('should paste string to paste form ', async () => {
    const key = 'Hello from WebDriver';
    const text = await PastbinPage.sendKeysToPastForm(key);
    await expect(text).toEqual(key);
  });
  it('should click on dropdown Paste Expiration and choose 10 minutes', async () => {
    const elemText = await PastbinPage.getPasteExpElem(3);
    await expect(elemText).toEqual('10 Minutes');
  });
  it('should send keys to paste tittle field', async () => {
    const text = await PastbinPage.sendKeysToTittleField('helloweb');
    await expect(text).toEqual('helloweb');
  });

  it('should click on button Create New Paste and move to the created paste page', async () => {
    await PastbinPage.createPaste();
    const result = await PastbinPage.checkNewPageLoaded();
    await expect(result).toEqual('helloweb');
  });
});
