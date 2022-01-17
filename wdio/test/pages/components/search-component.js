const BasePage = require('../Page');
const base = new BasePage();
async function search(key) {
  const searchForm = await $('.devsite-search-form');
  // await browser.moveToElement(searchForm);
  await searchForm.click();
  const searchField = await $(
    'body > section > devsite-header > div > div.devsite-top-logo-row-wrapper-wrapper > div > div > div.devsite-top-logo-row-middle > devsite-search > form > div.devsite-search-container > div > input'
  );
  await searchField.addValue(key);
  const keywords = await searchField.getValue();
  await browser.keys('\uE007');
  return keywords;
}
module.exports = search;
