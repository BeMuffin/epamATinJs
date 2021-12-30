const Calculator = require("../../app/calculator.js");
const chai = require("chai");
const spies = require("chai-spies");
const { expect } = require("chai");
chai.use(spies);

describe("multiply numbers", function () {
  let calculator1, spy;

  beforeEach(() => {
    calculator1 = new Calculator();
    spy = chai.spy.on(calculator1, "multiply");
  });

  afterEach(() => {
    calculator1 = null;
  });
  it("should return 6 when called with numbers 2 and 3", function () {
    expect(calculator1.multiply(2, 3)).to.be.equal(6);
  });
  it("should return underfined if myltiplied number 2 and string hi", function () {
    expect(calculator1.multiply(2, "hi")).to.be.equal(undefined);
  });
  it("should return 6 when called with numbers 0 and 100", function () {
    expect(calculator1.multiply(0, 100)).to.be.equal(0);
  });
  it("should return negotive number -6 when called with numbers 2 and -3", function () {
    expect(calculator1.multiply(2, -3)).to.be.equal(-6);
  });
  it("should return negotive number -6 when called with -2 and 3", function () {
    expect(calculator1.multiply(-2, 3)).to.be.equal(-6);
  });
  it("should return 0 when called with numbers 0 and -100", function () {
    expect(calculator1.multiply(0, -100)).to.be.equal(0);
  });
});
