const { waitElemLocated } = require('../../helper/waiters');
const searchForm = '.devsite-search-form';
const searchField = '.devsite-search-field';

async function search(key) {
  await (await waitElemLocated($(searchForm))).click();
  const searchFieldEl = await waitElemLocated($(searchField));
  await searchFieldEl.addValue(key);
  const keywords = await searchFieldEl.getValue();
  await browser.keys('\uE007');
  return keywords;
}
module.exports = search;
