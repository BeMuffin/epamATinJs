const BasePage = require('../base/basePage');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const search = require('./components/search-component');
const by = webdriver.By;
const until = webdriver.until;

class MailPage extends BasePage {
  constructor() {
    super();
    this.emailLink = '#listeliens > a:nth-child(1)';
    this.email = '#egen';
    this.pageId = this.getWindowHandle();
    this.emailFrame = '#ifmail';
    this.emailLetter =
      'body > header > div:nth-child(3) > div.ellipsis.nw.b.f18';
    this.getEmailButton =
      'body > div > div.ymaincenter > main > div > div.pagecdr.brounded > div > div > div.nw > button:nth-child(3)';
    this.emailDiv = '#e_ZwVjZGRlZGD0ZQN4ZQNjAQZ0ZGx1BD==';
    this.refreshBtn = '#refresh';
    this.emailsListFrame = '#ifinbox';
  }
  async getEmail() {
    await this.openPage('https://yopmail.com/');
    await this.driver.findElement(by.css(this.emailLink)).click();
    const email = await this.driver.findElement(by.css(this.email)).getText();
    return email;
  }
  async getLetter() {
    const scroll = await this.driver.findElement(
      by.css('body > div > div.ymaincenter > footer')
    );
    await this.moveToElement(scroll);
    await this.driver.findElement(by.css(this.getEmailButton)).click();
    // const eFrame = await this.driver.findElement(by.css(this.emailFrame));

    const refresh = await this.driver.findElement(by.css(this.refreshBtn));
    // await this.switchToFrame(this.emailsListFrame);
    let emailDiv = await this.driver.findElement(
      by.css(
        '#webmail > div.webmaillogo > div > main > div.wmmain > div.wmleft > div > div.wminboxheader > div:nth-child(5)'
      )
    );
    await emailDiv.getText();
    do {
      await refresh.click();
      emailDiv = await emailDiv.getText();
    } while (emailDiv != '1 mail');
    // await this.driver.findElement(by.css(this.emailDiv)).click();
    // await this.driver.wait(until.elementLocated(this.emailDiv).);
    // await this.waitNewPageLoaded(this.emailLetter, 5000);
    await this.switchToFrame(this.emailFrame);
    const letter = await this.driver
      .findElement(by.css(this.emailLetter))
      .getText();
    return letter;
  }
}
module.exports = MailPage;
