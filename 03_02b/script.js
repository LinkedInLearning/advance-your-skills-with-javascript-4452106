class UniqueClass {
  constructor(data) {
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

console.log(instance1.getData()); // "Data for the UniqueClass"
console.log(instance2.getData()); // "Data for the UniqueClass"
