const Calculator = require("../../app/calculator.js");
const chai = require("chai");
const spies = require("chai-spies");
const { expect } = require("chai");
chai.use(spies);

describe("summ numbers", function () {
  let calculator2, spy;

  beforeEach(() => {
    calculator2 = new Calculator();
    spy = chai.spy.on(calculator2, "add");
  });

  afterEach(() => {
    calculator2 = null;
  });
  it("should return 5 when called with numbers 2 and 3", function () {
    expect(calculator2.add(2, 3)).to.be.equal(5);
  });
  it("should return 2hi if summ number 2 and string hi", function () {
    expect(calculator2.add(2, "hi")).to.be.equal("2hi");
  });
});
