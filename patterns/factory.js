class Factory {
  createSmth(data) {
    if (data) return "true value";
    else return "false value";
  }
}

class FactoryConsumer {
  /** @type {Factory} */
  _factory;

  constructor(factory) {
    Object.defineProperties(this, {
      _factory: {
        enumerable: false,
        writable: false,
        value: factory,
      },
    });
  }

  doSmth() {
    const value = this._factory.createSmth(true);

    console.log("its here", value);
  }
}
