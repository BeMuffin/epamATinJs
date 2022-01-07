let chrome = require("selenium-webdriver/chrome");
const webdriver = require("selenium-webdriver");

async function googleCloud() {
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
  let originalWindow = await driver.getWindowHandle();
  console.log(originalWindow);
  await driver.get("https://cloud.google.com/");
  await driver.manage().setTimeouts({ implicit: 10000 });
  const searchForm = await driver.findElement(
    by.className("devsite-search-form")
  );
  const actions = driver.actions({ async: true });
  await actions.move({ origin: searchForm }).pause(1000).perform();
  await searchForm.click();
  const inputForm = await driver.findElement(
    by.css(
      "body > section > devsite-header > div > div.devsite-top-logo-row-wrapper-wrapper > div > div > div.devsite-top-logo-row-middle > devsite-search > form > div.devsite-search-container > div > input"
    )
  );
  await inputForm.sendKeys("Calculator");
  await driver.sleep(2000);
  await inputForm.sendKeys(webdriver.Key.ENTER);
  await driver.manage().setTimeouts({ implicit: 10000 });
  const calculatorLink = await driver.findElement(
    by.css(
      "#___gcse_0 > div > div > div > div.gsc-wrapper > div.gsc-resultsbox-visible > div > div > div.gsc-expansionArea > div:nth-child(1) > div.gs-webResult.gs-result > div.gsc-thumbnail-inside > div > a"
    )
  );
  await calculatorLink.click();
  await driver.sleep(10000);
  const cloudCalculator = await driver.getCurrentUrl();

  const iframe1 = await driver.findElement(
    by.css("#cloud-site > devsite-iframe > iframe")
  );
  await driver.switchTo().frame(iframe1);
  const iframe2 = await driver.findElement(by.css("#myFrame"));
  await driver.switchTo().frame(iframe2);
  const instansesField = await driver.findElement(by.css("#input_75"));
  await instansesField.sendKeys("4");
  const operatingSystemList = await driver.findElement(
    by.css("#select_value_label_67")
  );
  await operatingSystemList.click();
  await driver.sleep(2000);
  const listElem = await driver.findElement(
    by.css("#select_option_77 > div.md-text")
  );
  await listElem.click();
  const VMClassList = await driver
    .findElement(by.css("#select_value_label_68"))
    .click();
  await driver.sleep(2000);
  const VMClassListItem = await driver
    .findElement(by.css("#select_option_91")) //Preemptible
    .click();

  await driver.sleep(4000);

  let scroll = await driver.findElement(
    by.css(
      "#mainForm > div:nth-child(3) > div > md-card > md-card-content > div > div:nth-child(1) > form > div:nth-child(12) > div.layout-column.flex-gt-sm-90.flex-80 > md-input-container > md-checkbox"
    )
  );

  const machineTypeList = await driver.findElement(
    by.css("#select_value_label_71")
  );
  await machineTypeList.click();
  await driver.sleep(2000);
  const machineTypeListElem = await driver.findElement(
    by.css("#select_option_418")
  ); //e-standart-8
  await machineTypeListElem.click();
  await driver.sleep(4000);
  await driver
    .findElement(
      by.css(
        "#mainForm > div:nth-child(3) > div > md-card > md-card-content > div > div:nth-child(1) > form > div:nth-child(13) > div.layout-column.flex-gt-sm-90.flex-80 > md-input-container > md-checkbox"
      )
    )
    .click(); //checkbox
  await driver.sleep(2000);
  scroll = await driver.findElement(
    by.css(
      "#mainForm > div:nth-child(3) > div > md-card > md-card-content > div > div:nth-child(1) > form > div.layout-align-end-start.layout-row"
    )
  ); // scroll
  await driver.sleep(2000);
  await driver.findElement(by.css("#select_451")).click(); //gpu type
  await driver.sleep(2000);
  await driver.findElement(by.css("#select_option_458")).click(); //element
  await driver.sleep(2000);
  await driver.findElement(by.css("#select_value_label_450")).click(); //gpu number
  await driver.sleep(2000);
  await driver.findElement(by.css("#select_option_462")).click(); //el
  await driver.sleep(2000);
  await driver.findElement(by.css("#select_value_label_412")).click(); //
  await driver.sleep(2000);
  await driver.findElement(by.css("#select_option_439")).click(); // ssd
  await driver.findElement(by.css("#select_value_label_73")).click(); // location
  await driver.findElement(by.css("#select_option_228")).click(); //California
  await driver
    .findElement(
      by.css(
        "#mainForm > div:nth-child(3) > div > md-card > md-card-content > div > div:nth-child(1) > form > div.layout-align-end-start.layout-row > button"
      )
    )
    .click(); //add button
  // email button
  await driver.findElement(by.css("#email_quote")).click();
  await driver.sleep(4000);
  const emailForm = await driver.findElement(
    by.css("#dialogContent_521 > form")
  );
  originalWindow = await driver.getWindowHandle();
  //   const actions = driver.actions({ async: true });

  await driver.findElement(by.css("#input_513")).sendKeys("Hanna");
  await driver.sleep(4000);
  await driver.switchTo().newWindow("newWindow");
  await driver.get("https://yopmail.com/");
  await driver.findElement(by.css("#listeliens > a:nth-child(1)")).click();
  const email = await driver.findElement(by.css("#egen")).getText();
  const emailPage = await driver.getWindowHandle();
  console.log(email);
  await driver.switchTo().window(originalWindow);
  console.log(originalWindow);
  console.log(await driver.getCurrentUrl());

  await driver.sleep(10000);
  await driver.findElement(
    by.css(
      "body > section > devsite-header > div > div.devsite-top-logo-row-wrapper-wrapper > div > div > div.devsite-product-name-wrapper"
    )
  );
  await driver.switchTo().frame(iframe1);
  await driver.switchTo().frame(iframe2);
  await driver.sleep(2000);
  await driver.findElement(by.css("#dialogContent_521 > form"));

  await driver.findElement(by.css("#input_515")).sendKeys(email);
  await driver
    .findElement(
      by.css(
        "#dialogContent_521 > form > md-dialog-actions > button.md-raised.md-primary.cpc-button.md-button.md-ink-ripple"
      )
    )
    .click();
  await driver.sleep(2000);
  await driver.switchTo().window(emailPage);
  await driver
    .findElement(
      by.css(
        "body > div > div.ymaincenter > main > div > div.pagecdr.brounded > div > div > div.nw > button:nth-child(3)"
      )
    )
    .click();
  await driver.sleep(5000);
  const emailFrame = await driver.findElement(by.css("#ifmail"));
  await driver.switchTo().frame(emailFrame);
  const emailLetter = await driver
    .findElement(
      by.css("body > header > div:nth-child(3) > div.ellipsis.nw.b.f18")
    )
    .getText();
  console.log(emailLetter);
}
googleCloud();
