async function waitElemLocated(element) {
  await element.waitForExist({ timeout: 10000 });
  return element;
}
async function waitUntilClickable(element) {
  await browser.waitUntil(() => element.isClickable());
}
module.exports = {
  waitElemLocated,
  waitUntilClickable,
};
