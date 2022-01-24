const BasePage = require('../../base/basePage');
const webdriver = require('selenium-webdriver');
const { waitElemLocated } = require('../helper/waiters');

const by = webdriver.By;
const searchFormLocator = by.css('.devsite-search-form');
const inputFieldLocator = by.css('.devsite-search-field');
const base = new BasePage();

async function searchElement(keys) {
  const searchForm = await waitElemLocated(searchFormLocator);
  await base.moveToElement(searchForm);
  await searchForm.click();
  const inputForm = await base.driver.findElement(inputFieldLocator);
  await inputForm.sendKeys(keys);
  const keywords = await inputForm.getAttribute('value');
  await inputForm.sendKeys(webdriver.Key.ENTER);
  return keywords;
}

module.exports = searchElement;
