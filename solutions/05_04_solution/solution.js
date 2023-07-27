const runningTally = [];

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

const GST_RATE = 0.05; // 5% GST
const PST_RATE = 0.07; // 7% PST

class ShoppingCart extends ReactiveObject {
  constructor() {
    super();
    this.items = [];
    this.totalBeforeTax = 0;
    this.gst = 0;
    this.pst = 0;
    this.sumTotal = 0;
  }

  addItem(item) {
    this.items.push(item);
    this.#updateTotals();
    this.updateSubscribers();
  }

  removeItem(index) {
    if (index < 0 || index >= this.items.length) {
      throw new Error("Invalid index");
    }
    this.items.splice(index, 1);
    this.#updateTotals();
    this.updateSubscribers();
  }

  #updateTotals() {
    this.totalBeforeTax = this.items.reduce(
      (total, item) => total + item.price,
      0
    );
    this.gst = this.totalBeforeTax * GST_RATE;
    this.pst = this.totalBeforeTax * PST_RATE;
    this.sumTotal = this.totalBeforeTax + this.gst + this.pst;
  }
}

// Usage example
const cart = new ShoppingCart();

const tallyCart = (cart) => {
  const tally = {
    totalBeforeTax: cart.totalBeforeTax.toFixed(2),
    gst: cart.gst.toFixed(2),
    pst: cart.pst.toFixed(2),
    sumTotal: cart.sumTotal.toFixed(2),
  };

  runningTally.push(tally);
};

// Subscribe to changes
cart.subscribe(tallyCart);

// Sample items
const itemArray = [
  { name: "Item 1", price: 19.99 },
  { name: "Item 2", price: 29.99 },
  { name: "Item 3", price: 5.29 },
  { name: "Item 4", price: 9.99 },
];

// Iterate through itemArray and add items to the cart
itemArray.forEach((item) => cart.addItem(item));

// Remove first item from the cart
try {
  cart.removeItem(0);
} catch (error) {
  console.error(error);
}

// Unsubscribe from changes
cart.unsubscribe(tallyCart);

// These items should not be counted.
itemArray.forEach((item) => cart.addItem(item));

console.log(JSON.stringify(runningTally, null, 2));
console.log(runningTally.length);
