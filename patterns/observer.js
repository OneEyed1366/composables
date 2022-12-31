class Observer {
  constructor() {
    Object.defineProperties(this, {
      _indexes: {
        enumerable: false,
        writable: false,
        value: new Map(),
      },
      _observables: {
        enumerable: false,
        writable: true,
        value: [],
      },
    });
  }

  subscribe(callback) {
    this._indexes.set(callback, this._observables.push(callback));
  }

  unsubscribe(callback) {
    const _idx = this._indexes.get(callback);

    this._observables.splice(_idx - 1, 1);
  }

  notify(data) {
    this._observables.forEach((callback) => callback(data));
  }
}
