let reports = [];

class Observable {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

class Stock extends Observable {
  constructor(name) {
    super();
    this.name = name;
    this.price = 0;
  }

  updatePrice(price) {
    if (typeof price !== "number") {
      reports.push(
        `Error: Invalid price data '${price}' for ${this.name}. Price must be a number.`
      );
      return;
    }
    this.price = price;
    this.notify({ name: this.name, price: this.price });
  }
}

class PriceDisplay {
  update(data) {
    reports.push(
      `Price Display: ${data.name} stock price is now $${data.price}`
    );
  }
}

class PriceThresholdNotifier {
  constructor(threshold) {
    this.threshold = threshold;
  }

  update(data) {
    if (data.price >= this.threshold) {
      reports.push(
        `Price Threshold Notifier: ${data.name} stock price has reached the threshold of $${this.threshold}`
      );
    }
  }
}

class PercentageChangeNotifier {
  constructor(percentage) {
    this.percentage = percentage;
    this.previousPrice = null;
  }

  update(data) {
    if (this.previousPrice === null) {
      this.previousPrice = data.price;
      return;
    }

    const change =
      ((data.price - this.previousPrice) / this.previousPrice) * 100;
    if (Math.abs(change) >= this.percentage) {
      reports.push(
        `Percentage Change Notifier: ${
          data.name
        } stock price has changed by ${change.toFixed(2)}%`
      );
    }
    this.previousPrice = data.price;
  }
}

const stock = new Stock("ABC");

const priceDisplay = new PriceDisplay();
const priceThresholdNotifier = new PriceThresholdNotifier(150);
const percentageChangeNotifier = new PercentageChangeNotifier(5);

stock.addObserver(priceDisplay);
stock.addObserver(priceThresholdNotifier);
stock.addObserver(percentageChangeNotifier);

const priceArray = [100, 102, 151, -100, "aaa", "200"];

priceArray.forEach((price) => stock.updatePrice(price));

stock.removeObserver(priceThresholdNotifier);
stock.removeObserver(percentageChangeNotifier);

priceArray.forEach((price) => stock.updatePrice(price));

console.log(reports);
