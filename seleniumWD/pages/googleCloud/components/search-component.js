const BasePage = require('../../base/basePage');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const by = webdriver.By;

const base = new BasePage();
async function searchElement(keys) {
  const searchForm = await base.driver.findElement(
    by.className('devsite-search-form')
  );
  await base.moveToElement(searchForm);
  await searchForm.click();
  const inputForm = await base.driver.findElement(
    by.css(
      'body > section > devsite-header > div > div.devsite-top-logo-row-wrapper-wrapper > div > div > div.devsite-top-logo-row-middle > devsite-search > form > div.devsite-search-container > div > input'
    )
  );
  await inputForm.sendKeys(keys);
  const keywords = await inputForm.getAttribute('value');
  await inputForm.sendKeys(webdriver.Key.ENTER);
  await base.driver.sleep(3000);
  return keywords;
}

module.exports = searchElement;
