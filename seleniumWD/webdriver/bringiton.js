let chrome = require("selenium-webdriver/chrome");
const webdriver = require("selenium-webdriver");

async function addPaste() {
  const by = webdriver.By;
  const service = new chrome.ServiceBuilder(
    // "./node_modules/chromedriver/lib/chromedriver/chromedriver.exe"
    "./seleniumWD/node_modules/chromedriver/lib/chromedriver/chromedriver.exe"
  ).build();
  chrome.setDefaultService(service);

  const driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();
  driver.manage().window().maximize();
  await driver.get("https://pastebin.com");
  const parrentPage = await driver.getCurrentUrl();
  await driver.findElement(webdriver.By.id("postform-text")).sendKeys(
    `git config --global user.name  "New Sheriff in Town"
    git reset $(git commit-tree HEAD^{tree} -m "Legacy code")
    git push origin master --force`
  );
  let scroll = await driver.findElement(
    by.css("#w0 > div.content__title.-paste")
  );
  const actions = driver.actions({ async: true });
  await actions.move({ origin: scroll }).pause(1000).perform();
  const labelBtn = await driver.findElement(
    by.css("#w0 > div.content__title.-no-border > div > div > div")
  ); // switch
  await labelBtn.click();
  scroll = await driver.findElement(
    webdriver.By.css(
      "#w0 > div.post-form__bottom > div.post-form__left > div.form-group.field-postform-name > label"
    )
  );
  await actions.move({ origin: scroll }).pause(1000).perform();
  await driver
    .findElement(
      by.css(
        "#w0 > div.post-form__bottom > div.post-form__left > div.form-group.field-postform-format > div"
      )
    ) // code highlight
    .click();
  await driver.sleep(2000);
  await driver
    .findElement(
      by.xpath(
        "//*[@class='select2-results__options select2-results__options--nested']/li[1]"
      )
    ) //el of list code
    .click();
  await actions.move({ origin: scroll }).pause(1000).perform();
  await driver
    .findElement(
      by.css(
        "#w0 > div.post-form__bottom > div.post-form__left > div.form-group.field-postform-expiration > div > span"
      ) //minutes
    )
    .click();
  await driver.sleep(1000);
  await driver
    .findElement(by.xpath("//*[@class='select2-results__options']/li[3]")) //el of minutes
    .click();
  await driver
    .findElement(webdriver.By.id("postform-name"))
    .sendKeys("how to gain dominance among developers");
  scroll = await driver.findElement(webdriver.By.className("top-footer"));
  await actions.move({ origin: scroll }).pause(1000).perform();
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
