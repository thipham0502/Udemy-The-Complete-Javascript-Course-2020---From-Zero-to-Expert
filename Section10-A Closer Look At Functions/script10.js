'use strict';

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

// Javascript does not have pass by reference (variable's value can be changed inside the function)
// Just have pass by value (make a copy of the variable inside the function)
// For object type variable, we pass the copy of the variable's ADDRESS. But we can change the object's value because they all point to the same address in the memory heap

const flight = 'LH234'; //primitive type variable
const kathy = {
	//object type variable
	name: 'Kathy Pham',
	passport: 123456789
};
const checkin = function(flightNum, passenger) {
	//passing primitive type variable -> 'flightNum' is a copy of 'flight'
	//passing object type variable -> 'passenger' is a copy of the 'kathy''s address ('passenger' and 'kathy' all point to the same address -> change 'passenger' will also change 'kathy')
	flightNum = 'LH999';
	passenger.name = 'Ms.' + passenger.name;

	if (passenger.passport === 123456789) {
		console.log('Check in');
	} else {
		console.log('Wrong passport!');
	}
};
checkin(flight, kathy);
// Same as
const flightNum = flight;
const passenger = kathy;
console.log(flight);
console.log(kathy);

const newPassport = function(person) {
	person.passport = Math.trunc(Math.random() * 1000000000);
};
newPassport(kathy); //passport has changed!
checkin(flight, kathy); //wrong passport
console.log(kathy);

/* Lec128. First-class and Higher-order Functions */
console.log('----------Lec128----------');

// First-class functions:
//	+ First-class citizens (functions are simply values, because functions are just another type of objects in Javascript -> can be stored in variables or properties, can be passed as arguments to other functions, can be returned from other functions, and we can call methods on functions)
// + High-order functions: a function receives another function as an argument (the function as the argument if called a 'callback function', ex: addEventListener('click', greet) --> greet: callback function), can return a new function, or both

// High-order function returns a new function:
function count() {
	let counter = 0;
	return function() {
		counter++;
	};
}

/* Lec129. Functions accepting Callback functions */
console.log('----------Lec129----------');
const removeSpaces = function(str) {
	return str.replace(/ /g, '').toLowerCase(); //replace all spaces (' ') by '' and make it lower case
};
const upperFirstWord = function(str) {
	const [ first, ...others ] = str.split(' ');
	return [ first.toUpperCase(), ...others ].join(' ');
};
// High-order function (takes another function as an argument -> abstraction: hide the code)
const transformer = function(str, fn) {
	console.log(`Original string: ${str}`);
	console.log(`Transformed string: ${fn(str)}`); //call the function 'fn' on the string 'str'
	console.log(`Transformed by: ${fn.name}`); //name of the function
};
transformer('Javascript is the best!', upperFirstWord); //takes function 'upperFirstWord' as the argument (just pass its name). 'upperFirstWord' is a callback function

transformer('Javascript is the best!', removeSpaces); //takes function 'upperFirstWord' as the argument (just pass its name). 'removeSpaces' is a callback function

const high5 = function() {
	console.log('🖐');
};
document.body.addEventListener('click', high5); //'addEventListener' is a high-order function

[ 'Kathy', 'Taehyung', 'Jungkook' ].forEach(high5); //🖐🖐🖐

/* Lec130. Functions returning Functions */
console.log('----------Lec130----------');
const greet = function(greeting) {
	return function(name) {
		console.log(`${greeting} ${name}`);
	};
};
// Calling method 1:
const greeterHey = greet('Hey');
// Means that: greeterHey = function(name) {
// 	console.log(`${greeting} ${name}`); //where greeting = 'Hey'
// };
greeterHey('Kathy'); //Hey Kathy

// Calling method 2:
greet('Hello')('Thi'); //Hello Thi

// Arrow function
const greetArrow = (greeting) => (name) => {
	console.log(`${greeting} ${name}`);
};
greetArrow('Hi')('Katee');

/* Lec131. The call and apply methods */
// Allows manually setting 'this' keyword in function calls inside objects
console.log('----------Lec131----------');
const vietnameAirlines = {
	name: 'Vietnam Airlines JSC',
	iataCode: 'VN', //Airline and Airport Codes
	bookings: [],

	//Can write this instead of book: function(){}
	book(flightNum, passengerName) {
		console.log(`${passengerName} booked a seat on ${this.name} flight ${this.iataCode}${flightNum}`);
		this.bookings.push({ flight: `${this.iataCode}${flightNum}`, passengerName });
	}
};
vietnameAirlines.book(502, 'Kathy Pham');
console.log(vietnameAirlines);

// Reuse function 'book' in other objects
const eurowings = {
	name: 'Eurowings GmbH',
	iataCode: 'EW', //Airline and Airport Codes
	bookings: []
};
const book = vietnameAirlines.book;
// book(512, 'Tran Pham'); //ERROR: 'this' keyword is undefined

// Fix this problem by using 'call', 'apply', 'bind'
//// call(<the object we want the 'this' keyword to point to>, <arguments>)
book.call(eurowings, 512, 'Tran Pham'); //'this' keyword is now pointing to object 'eurowings'
console.log(eurowings);
book.call(vietnameAirlines, 512, 'Tran Pham'); //'this' keyword is now pointing to object 'vietnameAirlines'
console.log(eurowings);

const swiss = {
	name: 'Swiss Air Lines',
	iataCode: 'LX', //Airline and Airport Codes
	bookings: []
};
book.call(swiss, 512, 'Tran Pham'); //'this' keyword is now pointing to object 'swiss'
console.log(swiss);

//// apply(<the object we want the 'this' keyword to point to>, <ARRAY of arguments>)
//// (not used much now in modern Js, because we can use 'call')
const flightData = [ 512, 'Tran Pham' ]; //array of arguments
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData); //using 'call' with spread operator '...'
console.log(swiss);

/* Lec132. The bind method */
// Also allows manually setting 'this' keyword in function calls inside objects
// But does not immediately call the function, instead: returns a new function
console.log('----------Lec132----------');

// bind(<the object we want the 'this' keyword to point to>, <arguments>)
const bookEW = book.bind(eurowings); //book.bind() returns function 'bookEW', the 'this' keyword will always be set to 'eurowings' object
bookEW(52, 'KPham'); //just need to pass the arguments

// Partial application: already set value for some arguments (here we assign flightNum = 23)
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jennie'); //just need to pass the 'passengerName' argument
bookEW23('Rosé'); //just need to pass the 'passengerName' argument

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));
const addVAT = addTax.bind(null, 0.23); //no object for 'this' keyword (null) and pre-assign rate = 0.23
const addTaxRate = function(rate) {
	return function(value) {
		return value + value * rate;
	};
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(200));

// With event listeners
vietnameAirlines.planes = 300;
vietnameAirlines.buyPlane = function() {
	console.log(this);
	this.planes++;
	console.log(this.planes);
};
//document.querySelector('.buy').addEventListener('click', vietnameAirlines.buyPlane); //ERROR: 'this' keyword is set to the object calling it, here is the 'document.querySelector('.buy')' element

//// -> We should use 'bind' method
const buyPlaneVN = vietnameAirlines.buyPlane.bind(vietnameAirlines);
document.querySelector('.buy').addEventListener('click', buyPlaneVN);

/* Lec134. Immediately Invoked Function Expressions (IIFE) */
// Function that disappears after it is executed once
console.log('----------Lec134----------');
(function() {
	console.log('This function will never run again');
})();

// Arrow function
(() => console.log('This arrow function will never run again'))();

/* Lec135. Closures */
// A closure gives the function access to all the variables of its parent function, even after function has returned. The function keeps a reference to its outer scope, which preserves the scope chain throughout time -> makes sure a function doesn't loose connection to variables that existed at the function's birth place
// A closure is like a backpack that a function carries around wherever it goes. This backpack has all the variables that were present in the environment where the function was created
// -> Then whenever a variable can't be found in the function scope, Js will look into the backpack and take the missing variables from there
// Closures are created automatically by Js and we cannot access closures and take variables from it
console.log('----------Lec135----------');
const secureBooking = function() {
	let passengerCount = 0;

	return function() {
		passengerCount++;
		console.log(`${passengerCount} passengers`);
	};
};
const booker = secureBooking();
booker(); //1 passenger
booker(); //2 passengers

console.dir(booker); //showing attributes of function 'booker'
// Including the internal property [[Scopes]] that contains the Closure for function 'secureBooking' with passengerCount = 2
// (internal properties cannot be accessed from our code)

/* Lec136. More Closure Examples */
console.log('----------Lec136----------');
// Example 1:
let f;
const g = function() {
	const a = 22;
	f = function() {
		console.log(a * 2);
	};
};
g();
f(); // When calling a function inside a function -> closure is created
console.dir(f); //[[Scope]]: Closure (g) {a: 22}

const h = function() {
	const b = 55;

	//re-assign f
	f = function() {
		console.log(b * 3);
	};
};
h();
f();
console.dir(f); //[[Scope]]: Closure (g) {b: 55}

// Example 2:
const boardPassengers = function(n, wait) {
	const perGroup = n / 3;

	//setTimeout(<function will be executed after x milli seconds>, <x (milli seconds)>)
	setTimeout(function() {
		console.log(`We are now boarding all ${n} passengers`);
		console.log(`There are 3 groups, each with ${perGroup} passengers`);
	}, wait * 1000); //execute after (wait * 1000) milli seconds
	console.log(`Will start boarding in ${wait} seconds`);
};
boardPassengers(180, 3);
