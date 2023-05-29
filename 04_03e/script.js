/**
 * Observer pattern
 * - A one-to-many dependency between objects.
 * - When one object changes state, all its dependents are notified and updated automatically.
 * - Also known as Publish-Subscribe pattern
 
 */
class Product {
  constructor(name) {
    this.name = name;
    this.observers = [];
  }

  // The method that notifies all subscribers.
  backInStock() {
    this.notifyObservers(`${this.name} is back in stock.`);
  }

  // The method that adds a new subscriber.
  registerObserver(customer) {
    this.observers.push(customer.boundMessage);
    console.log(`Registered ${customer.name} as an observer of ${this.name}.`);
  }

  // The method that removes a subscriber.
  removeObserver(customer) {
    this.observers = this.observers.filter(
      (customer) => customer !== customer.boundMessage
    );
    console.log(`Removed ${customer.name} from observers of ${this.name}.`);
  }

  // The method that calls all subscribers.
  notifyObservers(productMessage) {
    this.observers.forEach((customer) => customer(productMessage));
  }
}

class Customer {
  constructor(name) {
    this.name = name;
    this.boundMessage = this.message.bind(this);
  }

  // The method that is called when the customer is notified.
  message(productMessage) {
    console.log(`${this.name}, ${productMessage}`);
  }
}

// A product that is out of stock
let backpack = new Product("Green Frog Pack");

// Some customers
let simran = new Customer("Simran");
let maiken = new Customer("Maiken");

backpack.registerObserver(simran);
backpack.registerObserver(maiken);

// Notify all customers when backpack is back in stock
backpack.backInStock();

// Remove a customer from the observer list
backpack.removeObserver(simran);
