class BaseClass {
  /** @type {number} */
  valueOne;
  /** @type {number} */
  valueTwo;

  factoryMethod() {
    if (this.valueOne >= this.valueTwo) return "one is bigger than two";
    else return "two is bigger than one";
  }
}

class ExtendedClass extends BaseClass {
  valueOne = 8;
  valueTwo = 5;

  constructor() {
    super();

    this.value = this.factoryMethod();
  }

  doSmth() {
    console.log("its here =", this.value);
  }
}

new ExtendedClass().doSmth();
