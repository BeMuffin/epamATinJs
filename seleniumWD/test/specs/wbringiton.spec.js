const PastbinPage = require('../../pages/pastebinPage');
const chai = require('chai');
const { expect } = require('chai');

describe('E2E Pastbin page testing ', function () {
  let homePage;
  before(async function () {
    homePage = new PastbinPage();
  });
  it('should load Pastebin page ', async () => {
    await homePage.openPage('https://pastebin.com/');
    await homePage.maximizeWindow();
    const url = await homePage.getPageUrl();
    await expect(url).be.equal('https://pastebin.com/');
  });
  it('should paste code strings to paste form ', async () => {
    const key = `git config --global user.name  "New Sheriff in Town"
    git reset $(git commit-tree HEAD^{tree} -m "Legacy code")
    git push origin master --force`;
    const text = await homePage.sendKeysToPastForm(key);
    await expect(text).to.equal(key);
  });
  it('should on switcher Syntax Highlighting ', async () => {
    const style = await homePage.switchHightlightSwitcher();
    await expect(style).to.equal('height: 300px;');
  });
  it('should get element Bash from Syntax Highlighting dropdown', async () => {
    const text = await homePage.getSyntaxHighlighDropDownEl('bash');
    await expect(text).to.equal('Bash');
  });
  it('should show syntax highlighting for bash', async () => {
    const language = await homePage.getSyntaxHighlighting();
    await expect(language).to.equal('shell');
  });
  it('should click on dropdown Paste Expiration and choose 10 minutes', async () => {
    const text = await homePage.getPasteExpElement('10 minutes');
    await expect(text).to.equal('10 Minutes');
  });
  it('should send keys to paste tittle field', async () => {
    const key = 'how to gain dominance among developers';
    const text = await homePage.sendKeysToPastForm(key);
    await expect(text).to.equal(key);
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
