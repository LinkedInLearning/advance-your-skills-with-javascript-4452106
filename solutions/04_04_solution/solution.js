class WeatherStation {
  constructor() {
    this.observers = new Set();
    this.temperature = null;
    this.displayNames = new Map();
  }

  addObserver(observer, displayName) {
    if (!this.observers.has(observer)) {
      this.observers.add(observer);
      this.displayNames.set(observer, displayName);
      return `Weather station: ${observer.displayName} subscribed to the weather station.`;
    }
  }

  removeObserver(observer) {
    if (this.observers.has(observer)) {
      this.observers.delete(observer);
      this.displayNames.delete(observer);
      return `Weather station: ${observer.displayName} unsubscribed from the weather station.`;
    }
  }

  notifyObservers() {
    this.observers.forEach((observer) => {
      const displayName = this.displayNames.get(observer);
      observer.update(this.temperature, displayName);
    });
  }

  setTemperature(newTemperature) {
    this.temperature = newTemperature;
    this.notifyObservers();
    return `Weather station: New temperature is ${newTemperature}°C`;
  }
}

class WeatherDisplay {
  constructor(displayName) {
    this.displayName = displayName;
  }

  update(temperature, displayName) {
    return `Weather display ${displayName} shows temperature: ${temperature}°C`;
  }
}

function runWeatherStation() {
  // Create weather station and displays
  const weatherStation = new WeatherStation();
  const display1 = new WeatherDisplay("Display 1");
  const display2 = new WeatherDisplay("Display 2");
  const results = [];

  // Subscribe displays to weather station
  results.push(weatherStation.addObserver(display1, display1.displayName));
  results.push(weatherStation.addObserver(display2, display2.displayName));
  // Set temperature and notify observers
  results.push(weatherStation.setTemperature(25));
  results.push(weatherStation.setTemperature(28));
  // Unsubscribe display 1
  results.push(weatherStation.removeObserver(display1));
  results.push(weatherStation.setTemperature(22));

  return results;
}

const results = runWeatherStation();
console.log(results);
