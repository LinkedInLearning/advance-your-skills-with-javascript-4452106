class Booking {
  constructor() {
    this._time = null;
  }

  set time(value) {
    let bookingHour = new Date(value).getHours();
    if (bookingHour < 9 || bookingHour > 16) {
      throw new Error("Bookings can only be made between 9AM and 4PM");
    }
    this._time = new Date(value);
  }

  get time() {
    return this._time;
  }
}

let booking = new Booking();

let bookingAttempts = [
  new Date("2023-05-24T10:00:00"),
  new Date("2023-05-24T08:00:00"),
  new Date("2023-05-24T17:00:00"),
];

for (let attempt of bookingAttempts) {
  try {
    booking.time = attempt;
    console.log(`Booking made successfully at ${booking._time}`);
  } catch (error) {
    console.log(`Booking attempt failed for ${attempt}: ${error.message}`);
  }
}
