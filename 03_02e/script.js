class Singleton {
  constructor(data) {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
    this.data = data;
  }

  getData() {
    return this.data;
  }
}

const instance1 = new Singleton(
  "Data for the first instance of the singleton."
);
const instance2 = new Singleton(
  "The second instance of the singleton should not be set."
);

// Freeze the instance to prevent changes.
Object.freeze(instance1);

instance1.data = "something new"; // This will not change the data.

console.log(instance1.getData()); // "Data for the Singleton"
console.log(instance2.getData()); // "Data for the Singleton"
