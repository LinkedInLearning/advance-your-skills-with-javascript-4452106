// Reactive Object
class ReactiveObject {
  constructor() {
    this.subscribers = [];
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  updateSubscribers(data, action) {
    this.subscribers.forEach((callback) => callback(data, action));
  }
}

class PlantTracker extends ReactiveObject {
  constructor() {
    super();
    this.plants = [];
  }

  sowPlant(name, sowingDate, estimatedFruitingTime) {
    const plant = {
      name,
      sowingDate,
      estimatedFruitingTime,
      actualFruitingTime: null,
      difference: null,
    };

    this.plants.push(plant);
    this.updateSubscribers(plant, "sow");
  }

  recordActualFruitingTime(plantIndex, actualFruitingTime) {
    const plant = this.plants[plantIndex];
    plant.actualFruitingTime = actualFruitingTime;

    const sowingDate = new Date(plant.sowingDate);
    const estimatedFruitingDate = new Date(
      sowingDate.getTime() + plant.estimatedFruitingTime * 24 * 60 * 60 * 1000
    );
    plant.difference = Math.round(
      (new Date(actualFruitingTime) - estimatedFruitingDate) /
        (24 * 60 * 60 * 1000)
    );

    this.updateSubscribers(plant, "fruit");
  }
}

// Usage example
const plantTracker = new PlantTracker();

plantTracker.subscribe((plant, action) => {
  if (action === "sow") {
    console.log("New plant:");
  } else if (action === "fruit") {
    console.log("Fruited plant:");
  }
  console.log(plant);
  console.log("");
});

const plantArray = [
  {
    name: "Tomato",
    sowingDate: "2023-02-01",
    estimatedFruitingTime: 60,
    actualFruitingTime: "2023-04-10",
  },
  {
    name: "Cucumber",
    sowingDate: "2023-03-21",
    estimatedFruitingTime: 50,
    actualFruitingTime: "2023-06-20",
  },
  {
    name: "Pepper",
    sowingDate: "2023-04-17",
    estimatedFruitingTime: 70,
    actualFruitingTime: "2023-06-20",
  },
  {
    name: "Eggplant",
    sowingDate: "2023-05-01",
    estimatedFruitingTime: 80,
    actualFruitingTime: "2023-07-20",
  },
];

plantArray.forEach((plant) => {
  plantTracker.sowPlant(
    plant.name,
    plant.sowingDate,
    plant.estimatedFruitingTime
  );
  plantTracker.recordActualFruitingTime(
    plantArray.indexOf(plant),
    plant.actualFruitingTime
  );
});

console.log(plantTracker.plants);
