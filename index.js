const store = {drivers: [], passengers: [], trips: []};
let driverId = 0;
let passengerId = 0;
let tripId = 0;

class Driver {
  constructor(name) {
    this.name = name;
    this.id = ++driverId;
    store.drivers.push(this);
  }

  trips() {
    return store.trips.filter(function(trip) {
      return trip.driverId === this.id;
    }.bind(this));
  }

  passengers() {
    return this.trips().reduce(function(passengers, trip) {
      if (passengers.indexOf(trip.passenger()) == -1) {
        return [...passengers, trip.passenger()];
      } else {
        return passengers;
      }
    }, []);
  }
}

class Passenger {
  constructor(name) {
    this.name = name;
    this.id = ++passengerId;
    store.passengers.push(this);
  }

  trips() {
    return store.trips.filter(function(trip) {
      return trip.passengerId === this.id;
    }.bind(this));
  }

  drivers() {
    return this.trips().reduce(function(drivers, trip) {
      if (drivers.indexOf(trip.driver()) == -1) {
        return [...drivers, trip.driver()];
      } else {
        return drivers
      }
    }, []);
  }
}

class Trip {
  constructor(driver, passenger) {
    if (driver) {
      this.driverId = driver.id;
    }
    if (passenger) {
      this.passengerId = passenger.id;
    }
    this.id = ++tripId;
    store.trips.push(this);
  }

  passenger() {
    return store.passengers.find(function(passenger) {
      return passenger.id === this.passengerId
    }.bind(this));
  }

  driver() {
    return store.drivers.find(function(driver) {
      return driver.id === driverId;
    });
  }
}
