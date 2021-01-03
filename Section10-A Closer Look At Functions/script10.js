'use script';

/* Lec126. Default Parameters */
console.log('----------Lec126----------');
const bookings = [];
const createBooking = function(flightNum, numPassengers = 1, price = 199 * numPassengers) {
	// Setting default values (ES5)
	// numPassengers = numPassengers || 1; //if numPassengers is null, then default is 1
	// price = price || 199; //if price is null, then default is 199

	const booking = {
		flightNum,
		numPassengers,
		price
	};
	console.log(booking);
	bookings.push(booking);
};
createBooking('LH123');
createBooking('LH123', 2);
createBooking('LH123', 2, 800);
// createBooking('LH123', , 800); //error
createBooking('LH123', undefined, 800);

/* Lec127. How parsing arguments works: Value vs. Reference */
console.log('----------Lec127----------');
const flight = 'LH234';
const kathy = {
	name     : 'Kathy Pham',
	passport : 123456789
};
const checkin = function(flightNum, passenger) {
	flightNum = 'LH999';
	passenger.name = 'Ms.' + passenger.name;

	if (passenger.passport === 123456789) {
		alert('Check in');
	} else {
		alert('Wrong passport!');
	}
};
checkin(flight, kathy);
console.log(flight);
console.log(kathy);
