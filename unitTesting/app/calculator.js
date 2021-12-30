class Calculator {
  constructor() {}

  isString(var1) {
    return typeof var1 === "string" ? true : false;
  }
  add(num1, num2) {
    return num1 + num2;
  }
  multiply(num1, num2) {
    console.log(typeof num2);
    if (this.isString(num1) === true || this.isString(num2) === true) {
      console.log("can't multiply string and number");
    } else {
      return num1 * num2;
    }
  }
}

cal1 = new Calculator();
console.log(cal1.multiply(5, "hi"));

module.exports = Calculator;
