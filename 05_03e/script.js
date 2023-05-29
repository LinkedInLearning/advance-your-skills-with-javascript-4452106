// Reactive Object
class ReactiveObject {
  constructor() {
    this.subscribers = [];
  }

  // Subscribe to changes
  subscribe(callback) {
    // Add callback to subscribers
    this.subscribers.push(callback);
  }

  // Unsubscribe from changes
  unsubscribe(callback) {
    // Remove the callback from subscribers
    this.subscribers = this.subscribers.filter((sub) => sub !== callback);
  }

  updateSubscribers() {
    this.subscribers.forEach((callback) => callback(this));
  }
}

// Temperature Monitor Object
class TemperatureMonitor extends ReactiveObject {
  constructor() {
    super();
    this.temperature = 0;
  }

  // Set temperature
  setTemperature(newTemperature) {
    this.temperature = newTemperature;
    this.updateSubscribers();
  }
}

// Cooling System Object
class CoolingSystem extends ReactiveObject {
  constructor() {
    super();
    this.status = "OFF";
  }

  // Trigger Cooling System
  triggerCoolingSystem(monitor) {
    if (monitor.temperature > 30) {
      this.status = "ON";
      console.log(`Cooling System Activated. Current Status: ${this.status}`);
    } else {
      this.status = "OFF";
      console.log(`Cooling System Deactivated. Current Status: ${this.status}`);
    }
  }
}

// Now we can use these reactive objects together:
let monitor = new TemperatureMonitor();
let coolingSystem = new CoolingSystem();

// Define a callback for temperature changes
let alertTemperature = (monitor) => {
  console.log(`Temperature has changed to ${monitor.temperature}°C`);
  if (monitor.temperature > 30) {
    console.log(
      `WARNING: It's ${monitor.temperature}°C. It's uncomfortably hot!`
    );
  }
};

// Subscribe to changes
monitor.subscribe(alertTemperature);
monitor.subscribe(coolingSystem.triggerCoolingSystem.bind(coolingSystem));

// Set a new temperature
monitor.setTemperature(35);

// Set a new temperature
monitor.setTemperature(28);
