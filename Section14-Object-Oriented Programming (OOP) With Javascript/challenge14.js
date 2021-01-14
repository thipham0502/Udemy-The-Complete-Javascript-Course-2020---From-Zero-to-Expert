'use strict';

console.log('----------Challenge #1----------');
/* Challenge #1
1. Use a constructor function to implement a 'Car'. A car has a 'make' and a 'speed' property. The 'speed' property is the current speed of the car in km/h

2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console

3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console

4. Create 2 'Car' objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them

Test data:
o Data car 1: 'BMW' going at 120 km/h
o Data car 2: 'Mercedes' going at 95 km/h
*/

// 1.
const Car = function(make, speed) {
	this.make = make;
	this.speed = speed;
};
const car1 = new Car('BMW', 130),
	car2 = new Car('Mercedes', 95);
console.log(car1);
console.log(car2);

// 2.
Car.prototype.accelerate = function() {
	this.speed += 10;
	console.log(`${this.make}'s new speed is ${this.speed} km/h`);
};

// 3.
Car.prototype.brake = function() {
	this.speed -= 5;
	console.log(`${this.make}'s new speed is ${this.speed} km/h`);
};

// 4.
car1.accelerate(); //140 km/h
car1.accelerate(); //150 km/h
car1.brake(); //145 km/h
car1.accelerate(); //160 km/h

car2.brake(); //90 km/h
car2.brake(); //85 km/h
car2.accelerate(); //95 km/h
car2.brake(); //80 km/h

/* Challenge #2
1. Re-create challenge #1, but this time using an ES6 class (call it 'CarCl')

2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6)

3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6)

4. Create a new car and experiment with the 'accelerate' and 'brake' methods, and with the getter and setter.

Test data:
o Data car 1: 'Ford' going at 120 km/h
*/
console.log('----------Challenge #2----------');
class CarCl {
	constructor(make, speed) {
		this.make = make;
		this.speed = speed;
	}
	accelerate() {
		this.speed += 10;
		console.log(`${this.make}'s new speed is ${this.speed} km/h`);
	}
	brake() {
		this.speed -= 5;
		console.log(`${this.make}'s new speed is ${this.speed} km/h`);
	}
	// Getter
	get speedUS() {
		return this.speed / 1.6; //convert to mi/h
	}

	// Setter
	set speedUS(speed) {
		this.speed = speed * 1.6; //convert to km/h
	}
}
const ford = new CarCl('Ford', 120);
ford.accelerate(); //130 km/h
console.log(ford.speedUS); //81.25 mi/h
ford.brake(); //125 km/h
ford.accelerate(); //135 km/h

ford.speedUS = 100; //call Setter to convert to km/h
console.log(ford); //160 km/h
ford.brake(); //155 km/h
ford.accelerate(); //165 km/h
