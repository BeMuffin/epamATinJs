let chrome = require("selenium-webdriver/chrome");
const webdriver = require("selenium-webdriver");

async function addPaste() {
  const service = new chrome.ServiceBuilder(
    // "./node_modules/chromedriver/lib/chromedriver/chromedriver.exe"
    "./seleniumWD/node_modules/chromedriver/lib/chromedriver/chromedriver.exe"
  ).build();
  chrome.setDefaultService(service);

  const driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();
  await driver.get("https://pastebin.com");
  const parrentPage = await driver.getCurrentUrl();

  await driver
    .findElement(webdriver.By.id("postform-text"))
    .sendKeys("Hello from WebDriver");
  let dropdown = await driver.findElement(
    webdriver.By.css(
      "#w0 > div.post-form__bottom > div.post-form__left > div.form-group.field-postform-expiration > div > span"
    )
  );
  let scroll = await driver.findElement(
    webdriver.By.css(
      "#w0 > div.post-form__bottom > div.post-form__left > div.form-group.field-postform-name > label"
    )
  );
  const actions = driver.actions({ async: true });
  await actions.move({ origin: scroll }).pause(1000).perform();
  await dropdown.click();
  driver.sleep(1000);
  await driver
    .findElement(
      webdriver.By.xpath("//*[@class='select2-results__options']/li[3]")
    )
    .click();
  driver.sleep(1000);
  await driver
    .findElement(webdriver.By.id("postform-name"))
    .sendKeys("helloweb");

  scroll = await driver.findElement(webdriver.By.className("top-footer"));
  await actions.move({ origin: scroll }).pause(1000).perform();
  driver.sleep(10000);
  await driver
    .findElement(
      webdriver.By.css(
        "#w0 > div.post-form__bottom > div.post-form__left > div.form-group.form-btn-container > button"
      )
    )
    .click();

  await driver.manage().setTimeouts({ implicit: 10000 });
  let resultPageUrl = await driver.getCurrentUrl();
  do {
    resultPageUrl = await driver.getCurrentUrl();
    driver.sleep(1000);
  } while (resultPageUrl === parrentPage);
  console.log(resultPageUrl);
  driver.sleep(5000);
  driver.quit();
}
addPaste();
// loginPage();

// async function loginPage() {
//   const service = new chrome.ServiceBuilder(
//     // "./node_modules/chromedriver/lib/chromedriver/chromedriver.exe"
//     "./seleniumWD/node_modules/chromedriver/lib/chromedriver/chromedriver.exe"
//   ).build();
//   chrome.setDefaultService(service);

//   const driver = new webdriver.Builder()
//     .withCapabilities(webdriver.Capabilities.chrome())
//     .build();
//   await driver.get("https://pastebin.com");
//   let ele = await driver.wait(
//     webdriver.until.elementLocated(
//       webdriver.By.css(
//         "body > div.wrap > div.header > div > div > div.header__right > div > a.btn-sign.sign-in"
//       )
//     ),
//     10000
//   );
//   await driver
//     .findElement(
//       webdriver.By.css(
//         "body > div.wrap > div.header > div > div > div.header__right > div > a.btn-sign.sign-in"
//       )
//     )
//     .click();
//   await driver.manage().setTimeouts({ implicit: 30000 });
//   await driver
//     .findElement(webdriver.By.id("loginform-username"))
//     .sendKeys("LuminorenA");
//   await driver
//     .findElement(webdriver.By.id("loginform-password"))
//     .sendKeys("(LMYyv4CZ.2gkst");
//   await driver.findElement(webdriver.By.className("btn.-big")).click();
// }
