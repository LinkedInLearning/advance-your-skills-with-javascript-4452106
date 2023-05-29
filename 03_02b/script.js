class Singleton {
  constructor(data) {
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

console.log(instance1.getData()); // "Data for the Singleton"
console.log(instance2.getData()); // "Data for the Singleton"
