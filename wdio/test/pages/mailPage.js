const BasePage = require('./Page');
const { waitElemLocated } = require('../helper/waiters');

class MailPage extends BasePage {
  get createEmailLink() {
    return $('#listeliens [href="email-generator"]');
  }
  get email() {
    return $('#egen');
  }
  get pageId() {
    return this.getWindowHandle();
  }
  get emailFrame() {
    return $('#ifmail');
  }
  get emailLetter() {
    return $('div.ellipsis');
  }
  get emailButton() {
    return $('.tooltip +button');
  }
  get emailDiv() {
    return $('div.m');
  }
  get refreshBtn() {
    return $('#refresh');
  }
  get emailsListFrame() {
    return $('#ifinbox');
  }
  get emailCounter() {
    return $('#nbmail');
  }
  get footer() {
    return $('footer');
  }
  async clickOnElem(element) {
    await (await waitElemLocated(element)).click();
  }
  async getEmail() {
    await browser.newWindow('https://yopmail.com/');
    await this.clickOnElem(this.createEmailLink);
    const email = await waitElemLocated(this.email);
    return await email.getText();
  }
  async getLetter() {
    await browser.switchWindow('yopmail.com');
    const scroll = await waitElemLocated(this.footer);
    await scroll.scrollIntoView();
    await this.clickOnElem(this.emailButton);
    const refresh = await waitElemLocated(this.refreshBtn);
    const emailCounter = await waitElemLocated(this.emailCounter);
    let result;
    do {
      await refresh.click();
      result = await emailCounter.getText();
    } while (result === '0 mail');
    const emailFrame = await waitElemLocated(this.emailFrame);
    await browser.switchToFrame(emailFrame);
    const letter = await waitElemLocated(this.emailLetter);
    return await letter.getText();
  }
}
module.exports = new MailPage();
