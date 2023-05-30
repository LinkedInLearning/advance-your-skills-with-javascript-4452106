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

// Now we can use this reactive object:
const monitor = new TemperatureMonitor();

// Define a callback for temperature changes
const alertTemperature = (monitor) => {
  if (monitor.temperature > 30) {
    console.log(
      `WARNING: It's ${monitor.temperature}°C. It's uncomfortably hot!`
    );
  } else {
    console.log(
      `The temperature is ${monitor.temperature}°C.`
    );
  }
};

// Subscribe to changes
monitor.subscribe(alertTemperature);

// Set a new temperature
monitor.setTemperature(35); // Logs: 'WARNING: Temperature too high!'

// Unsubscribe from changes
monitor.unsubscribe(alertTemperature);

// Set a new temperature
monitor.setTemperature(40); // Does not log anything because we have unsubscribed.
