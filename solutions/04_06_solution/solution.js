// Empty array to store reports
let reports = [];

// The main Observable class
class Observable {
  constructor() {
    // Initialize an empty array to store observers
    this.observers = [];
  }

  // Method to add an observer to the observers array
  addObserver(observer) {
    this.observers.push(observer);
  }

  // Method to remove an observer from the observers array
  removeObserver(observer) {
    // Find the index of the observer in the observers array
    const index = this.observers.indexOf(observer);
    // If the observer is found, remove it from the array
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  // Method to notify all observers with some data
  notify(data) {
    // Call the update method on each observer with the data
    this.observers.forEach((observer) => observer.update(data));
  }
}

// Class called Stock that extends Observable
class Stock extends Observable {
  constructor(name) {
    // Call the constructor of the Observable class
    super();
    // Set the name of the stock
    this.name = name;
    // Set the initial price of the stock to 0
    this.price = 0;
  }

  // Method to update the price of the stock
  updatePrice(price) {
    // If the price is not a number, add an error report to the reports array and return
    if (typeof price !== "number") {
      reports.push(
        `Error: Invalid price data '${price}' for ${this.name}. Price must be a number.`
      );
      return;
    }
    // Set the price of the stock to the new price
    this.price = price;
    // Notify all observers with an object containing the name and price of the stock
    this.notify({ name: this.name, price: this.price });
  }
}

// Class called PriceDisplay
class PriceDisplay {
  // Method to update the price display with new data
  update(data) {
    // Add a report to the reports array with the name and price of the stock
    reports.push(
      `Price Display: ${data.name} stock price is now $${data.price}`
    );
  }
}

// Class called PriceThresholdNotifier
class PriceThresholdNotifier {
  constructor(threshold) {
    // Set the threshold for the notifier
    this.threshold = threshold;
  }

  // Method to notify if the price of the stock has reached the threshold
  update(data) {
    // If the price of the stock is greater than or equal to the threshold, add a report to the reports array
    if (data.price >= this.threshold) {
      reports.push(
        `Price Threshold Notifier: ${data.name} stock price has reached the threshold of $${this.threshold}`
      );
    }
  }
}

// Class called PercentageChangeNotifier
class PercentageChangeNotifier {
  constructor(percentage) {
    // Set the percentage change threshold for the notifier
    this.percentage = percentage;
    // Set the previous price of the stock to null
    this.previousPrice = null;
  }

  // Method to notify if the price of the stock has changed by a certain percentage
  update(data) {
    // If the previous price is null, set it to the current price and return
    if (this.previousPrice === null) {
      this.previousPrice = data.price;
      return;
    }

    // Calculate the percentage change in the price of the stock
    const change =
      ((data.price - this.previousPrice) / this.previousPrice) * 100;
    // If the absolute value of the percentage change is greater than or equal to the threshold, add a report to the reports array
    if (Math.abs(change) >= this.percentage) {
      reports.push(
        `Percentage Change Notifier: ${
          data.name
        } stock price has changed by ${change.toFixed(2)}%`
      );
    }
    // Set the previous price of the stock to the current price
    this.previousPrice = data.price;
  }
}

// New instance of the Stock class with the name "ABC"
const stock = new Stock("ABC");

// Instances of the PriceDisplay, PriceThresholdNotifier, and PercentageChangeNotifier classes
const priceDisplay = new PriceDisplay();
const priceThresholdNotifier = new PriceThresholdNotifier(150);
const percentageChangeNotifier = new PercentageChangeNotifier(5);

// Add the PriceDisplay, PriceThresholdNotifier, and PercentageChangeNotifier instances as observers of the stock instance
stock.addObserver(priceDisplay);
stock.addObserver(priceThresholdNotifier);
stock.addObserver(percentageChangeNotifier);

// Array of prices to update the stock with
const priceArray = [100, 102, 151, -100, "aaa", "200"];

// Update the stock with each price in the priceArray
priceArray.forEach((price) => stock.updatePrice(price));

// Remove the PriceThresholdNotifier and PercentageChangeNotifier instances as observers of the stock instance
stock.removeObserver(priceThresholdNotifier);
stock.removeObserver(percentageChangeNotifier);

// Update the stock with each price in the priceArray again
priceArray.forEach((price) => stock.updatePrice(price));

// Log the reports array to the console
console.log(reports);
