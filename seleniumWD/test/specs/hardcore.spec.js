const calculatorPage = require('../../pages/googleCloud/googleCloudPage');
const chai = require('chai');
const { expect, should } = require('chai');

describe('E2E Pastbin page testing ', function () {
  let page = new calculatorPage();
  it('should get email from emailLink', async function () {
    const homePage = page.getWindowHandle();
    // await page.getEmailLetter();
    const email = await page.getEmailPage();
    let emailPage = page.getWindowHandle();
    const result = page.inputEmailInField(homePage, email); // getting email
    await expect(result).to.equal(email);
  });
  //   it('should get letter from email account', async function () {
  //     const homePage = page.getWindowHandle();
  //     const email = await page.getEmailPage()();
  //     const emailPage = page.getWindowHandle();
  //     const result = page.inputEmailInField(homePage, email); // getting email
  //     await expect(result).to.equal(email);
  //   });
});
