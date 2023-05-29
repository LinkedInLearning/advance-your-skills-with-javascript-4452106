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
    // Define the product message.
    this.notifyObservers(`${this.name} is back in stock.`);
  }
}

class Customer {
  constructor(name) {
    this.name = name;
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
