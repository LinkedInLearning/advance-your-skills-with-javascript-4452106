const errorMsgs = {
  invalidEmail: "Not a valid email address",
  invalidDate:
    "Invalid date, please provide a date in the future and on a weekday",
  invalidTime: "Invalid time, please request a time between 09:00 and 16:00.",
};

// ValidationManager: Manages the validation rules for various fields.
class ValidationManager {
  constructor() {
    // Singleton pattern is used to ensure a single instance of ValidationManager.
    if (!ValidationManager.instance) {
      this._rules = {}; // Object to hold the validation rules.
      ValidationManager.instance = this;
    }

    return ValidationManager.instance;
  }

  // Method to register a validation rule.
  registerValidationRule(name, ruleFunction) {
    this._rules[name] = ruleFunction;
  }

  // Method to validate a value against a specified rule.
  validate(name, value) {
    const ruleFunction = this._rules[name];
    return ruleFunction ? ruleFunction(value) : false;
  }
}

// Singleton instance of ValidationManager
const validationManagerInstance = new ValidationManager();

// Booking: Represents a booking object.
class Booking {
  constructor(firstName, lastName, email, date, time) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.date = date;
    this.time = time;
    this.errors = []; // Array to hold errors if any.
  }
}

// BookingManager: Manages all the bookings.
class BookingManager {
  constructor() {
    // Singleton pattern is used to ensure a single instance of BookingManager.
    if (!BookingManager.instance) {
      this.bookings = []; // Array to hold all the bookings.
      BookingManager.instance = this;
    }

    return BookingManager.instance;
  }

  // Method to add a booking after validating it.
  addBooking(booking) {
    const validationFields = Object.keys(bookingValidationRules);
    let valid = true;

    const errors = booking.errors;

    // Validate each field in the booking.
    for (const field of validationFields) {
      const validationRule = bookingValidationRules[field];
      const fieldValue = booking[field];

      if (!validationManagerInstance.validate(validationRule, fieldValue)) {
        // Add corresponding error message based on the field.
        switch (field) {
          case "email":
            errors.push(errorMsgs.invalidEmail);
            break;
          case "date":
            errors.push(errorMsgs.invalidDate);
            break;
          case "time":
            errors.push(errorMsgs.invalidTime);
            break;
          default:
            errors.push(`Invalid ${field}`);
        }

        valid = false;
      }
    }

    // Check if there is already a booking at the same date and time.
    const overlappingBooking = this.bookings.find(
      (existingBooking) =>
        existingBooking.date === booking.date &&
        existingBooking.time === booking.time
    );

    if (overlappingBooking) {
      booking.errors.push("Time not available");
      valid = false;
    } else {
      this.bookings.push(booking);
    }

    return valid;
  }
}

// Singleton instance of BookingManager
const bookingManagerInstance = new BookingManager();

// Function to create a validation proxy for a given object and a set of rules.
function createValidationProxy(object, rules) {
  return new Proxy(object, {
    set(target, prop, value) {
      // If the property being set is in the rules and the value is invalid, throw an error.
      if (
        prop in rules &&
        !validationManagerInstance.validate(rules[prop], value)
      ) {
        throw new Error(`Invalid ${prop}`);
      }

      // Otherwise, set the value as usual.
      target[prop] = value;
      return true;
    },
  });
}

// Validation rules
const bookingValidationRules = {
  email: "email",
  date: "bookingDate",
  time: "bookingTime",
};

// Email validation
validationManagerInstance.registerValidationRule("email", (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof value === "string" && emailRegex.test(value);
});

// Date validation
validationManagerInstance.registerValidationRule("bookingDate", (value) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(value)) return false;

  const date = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const day = date.getDay();
  return date >= today && day >= 1 && day <= 5; // Weekdays only
});

// Time validation
validationManagerInstance.registerValidationRule("bookingTime", (value) => {
  const timeRegex = /^([0-9]{2}):([0-9]{2})$/;
  if (!timeRegex.test(value)) return false;

  const [hour, minute] = value.split(":").map((x) => parseInt(x));
  return hour >= 9 && hour < 16 && minute === 0;
});

const bookings = [
  {
    firstName: "Amelia",
    lastName: "Zhang",
    email: "amelia.zhang@example.com",
    date: "2023-06-01",
    time: "09:00",
  },
  {
    firstName: "111",
    lastName: "García",
    email: "sergio.garcia@example.com",
    date: "2023-06-01",
    time: "09:00",
  },
  {
    firstName: "Fatima",
    lastName: "Hassan",
    email: "fatima.hassan@example.com",
    date: "2023-06-01",
    time: "08:00",
  },
  {
    firstName: "Kwame",
    lastName: "Nkrumah",
    email: "kwame.nkrumah@examplecom",
    date: "2023-06-03",
    time: "10:00",
  },
  {
    firstName: "Maiken",
    lastName: "Galden",
    email: "maiken@example.com",
    date: "2023-07-05",
    time: "10:00",
  },
];

// This function returns an array of results of booking attempts
const result = bookings.map((booking, index) => {
  try {
    const testBooking = new Booking(
      booking.firstName,
      booking.lastName,
      booking.email,
      booking.date,
      booking.time
    );
    const validatedBooking = createValidationProxy(
      testBooking,
      bookingValidationRules
    );

    if (bookingManagerInstance.addBooking(validatedBooking)) {
      return `Booking ${index + 1} added successfully`;
    } else {
      return `Booking ${
        index + 1
      } failed with the following errors: ${testBooking.errors.join(". ")}`;
    }
  } catch (error) {
    return `Booking ${index + 1} error: ${error.message}`;
  }
});

console.log(result);
