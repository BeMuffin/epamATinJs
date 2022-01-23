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
    by.css('.devsite-search-field')
  );
  await inputForm.sendKeys(keys);
  const keywords = await inputForm.getAttribute('value');
  await inputForm.sendKeys(webdriver.Key.ENTER);
  return keywords;
}

module.exports = searchElement;
