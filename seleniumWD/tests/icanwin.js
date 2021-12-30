let chrome = require("selenium-webdriver/chrome");
const webdriver = require("selenium-webdriver");

async function addPaste() {
  const service = new chrome.ServiceBuilder(
    "./node_modules/chromedriver/lib/chromedriver/chromedriver.exe"
  ).build();
  chrome.setDefaultService(service);

  const driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();
  await driver.get("https://pastebin.com");
  await driver.findElement(webdriver.By.className("header__btn")).click();
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
  let newPage = await driver.getCurrentUrl();
  await driver.get(newPage);
  await driver.findElement(
    webdriver.By.css(
      "body > div.wrap > div.container > div.content > div.post-view > div.page > div > div"
    )
  );
  sleep(10000);
  driver.close();
}
addPaste();
