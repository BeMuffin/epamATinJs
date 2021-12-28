const { Builder } = require("selenium-webdriver");

async function addPaste() {
  let driver = await new Builder().forBrowser("chrome").build();

  await driver.get("https://pastebin.com");
}
addPaste();
