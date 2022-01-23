const BasePage = require('../base/basePage');
const webdriver = require('selenium-webdriver');
const by = webdriver.By;
const until = webdriver.until;

class MailPage extends BasePage {
  constructor() {
    super();
    this.createEmailLink = by.css('#listeliens [href="email-generator"]');
    this.email = by.css('#egen');
    this.pageId = this.getWindowHandle();
    this.emailFrame = by.css('#ifmail');
    this.emailLetter = by.css('div.ellipsis');
    this.getEmailButton = by.css('.tooltip +button');
    this.emailDiv = by.css('div.m');
    this.refreshBtn = by.css('#refresh');
    this.emailsListFrame = by.css('#ifinbox');
    this.emailCounter = by.css('#nbmail');
    this.footer = by.css('footer');
  }
  async getEmail() {
    await this.openPage('https://yopmail.com/');
    await this.driver.findElement(this.createEmailLink).click();
    const email = await this.driver.findElement(this.email).getText();
    return email;
  }
  async getLetter() {
    const scroll = await this.driver.findElement(this.footer);
    await this.moveToElement(scroll);
    await this.driver.findElement(this.getEmailButton).click();
    await this.driver.sleep(2000);
    const refresh = await this.driver.findElement(this.refreshBtn);
    let emailDiv = await this.driver.findElement(this.emailCounter);
    await emailDiv.getText();
    do {
      await refresh.click();
      emailDiv = await emailDiv.getText();
    } while (emailDiv === '0 mail');
    const emailFrame = await this.driver.findElement(this.emailFrame);
    await this.switchToFrame(emailFrame);
    const letter = await this.driver.findElement(this.emailLetter).getText();
    return letter;
  }
}
module.exports = MailPage;
