const PastbinPage = require("./../../pages/pastebinPage");
// const { describe } = require("mocha");
// const mocha = require("mocha");
const chai = require("chai");
const { expect } = require("chai");

describe("E2E Pastbin page testing ", function () {
  let homePage;
  before(async function () {
    homePage = new PastbinPage();
  });

  it("should load Pastebin page ", async () => {
    await homePage.openPage("https://pastebin.com/");
    const url = await homePage.getPageUrl();
    await expect(url).be.equal("https://pastebin.com/");
  });

  after(async () => {
    await homePage.quit();
  });
});
