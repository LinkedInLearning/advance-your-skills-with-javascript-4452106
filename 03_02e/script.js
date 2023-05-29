class UniqueClass {
  constructor(data) {
    if (UniqueClass.instance) {
      return UniqueClass.instance;
    }
    UniqueClass.instance = this;
    this.data = data;
  }

  getData() {
    return this.data;
  }
}

const instance1 = new UniqueClass(
  "Data for the first instance of the UniqueClass."
);
const instance2 = new UniqueClass(
  "The second instance of the UniqueClass should not be set."
);

// Freeze the instance to prevent changes.
Object.freeze(instance1);

instance1.data = "something new"; // This will not change the data.

console.log(instance1.getData()); // "Data for the UniqueClass"
console.log(instance2.getData()); // "Data for the UniqueClass"
