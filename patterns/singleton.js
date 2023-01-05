class Singleton {
  constructor() {
    if (Singleton._instance) {
      console.log("its here");
      return Singleton._instance;
    }

    Singleton._instance = this;
  }
}

new Singleton();
new Singleton();
new Singleton();
new Singleton();
new Singleton();
new Singleton();
