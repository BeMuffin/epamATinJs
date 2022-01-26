const PastbinPage = require('../pages/pastebinPage');
describe('E2E Pastbin page testing ', function () {
  it('should load Pastebin page ', async () => {
    await PastbinPage.open();
    await PastbinPage.windowMaximize();
    await expect(browser).toHaveUrl('https://pastebin.com/');
  });
  it('should paste strings to paste form ', async () => {
    const key = `git config --global user.name  "New Sheriff in Town"
      git reset $(git commit-tree HEAD^{tree} -m "Legacy code")
      git push origin master --force`;
    const text = await PastbinPage.sendKeysToPastForm(key);
    await expect(text).toEqual(key);
  });
  it('should on switcher Syntax Highlighting ', async () => {
    const style = await PastbinPage.switchHightlightSwitcher();
    await expect(style).toEqual('height: 300px;');
  });
  it('should get element Bash from Syntax Highlighting dropdown', async () => {
    const text = await PastbinPage.getSyntaxHighlighDropDownEl(1);
    await expect(text).toEqual('Bash');
  });
  it('should show syntax highlighting for bash', async () => {
    const language = await PastbinPage.getSyntaxHighlighting();
    await expect(language).toEqual('shell');
  });
  it('should click on dropdown Paste Expiration and choose 10 minutes', async () => {
    const text = await PastbinPage.getPasteExpElem('3');
    await expect(text).toEqual('10 Minutes');
  });
  it('should send keys to paste tittle field', async () => {
    const key = 'how to gain dominance among developers';
    const text = await PastbinPage.sendKeysToTittleField(key);
    await expect(text).toEqual(key);
  });
  it('should click on button Create New Paste and move to the created paste page', async () => {
    await PastbinPage.createPaste();
    const result = await PastbinPage.checkNewPageLoaded();
    await expect(result).toEqual('how to gain dominance among developers');
  });
});
