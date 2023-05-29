// Vehicle class
class Vehicle {
  constructor(name, wheels) {
    this.name = name;
    this.wheels = wheels;
  }

  // Return a description of the vehicle
  getDescription() {
    return `${this.name} has ${this.wheels} wheels`;
  }
}

// Car class extends Vehicle
// Add number of doors
class Car extends Vehicle {
  constructor(name, doors) {
    super(name, 4);
    this.doors = doors;
  }
}

// Bike class extends Vehicle
class Bike extends Vehicle {
  constructor(name, type) {
    super(name, 2);
    this.type = type;
  }
}

const myCar = new Car("My Car", 4);
console.log(myCar.getDescription()); // My Car has 4 wheels
console.log(myCar.doors); // 4

const myBike = new Bike("My Bike", "offroad");
console.log(myBike.getDescription()); // My Bike has 2 wheels
console.log(myBike.type); // offroad
