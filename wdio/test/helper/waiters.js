async function waitElemLocated(element) {
  await element.waitForExist({ timeout: 10000 });
  return element;
}
async function waitUntilGetText(element) {
  await element.waitUntil(async function () {
    return await element.getText();
  }, 10000);
}
async function waitUntilAddValue(element, value) {
  await element.waitUntil(async function () {
    await element.addValue(value);
  }, 10000);
}
async function waitUntilGetValue(element) {
  await element.waitUntil(async function () {
    await element.getValue();
  }, 10000);
}
module.exports = {
  waitElemLocated,
  waitUntilGetText,
  waitUntilGetValue,
  waitUntilAddValue,
};
