'use strict';

// -----Modern Javascript focus----- \\

/* Lec103. Destructuring arrays */
// Unpacking values in array
const arr = [ 'Kathy', 22, 'red' ];
const [ firstName, age, color ] = arr;
console.log(firstName, age, color);

// Unpacking values in array inside an object
let restaurant = {
	name: 'Classico Italiano',
	location: 'Via Angelo Tavanti 23, Firenze, Italy',
	categories: [ 'Italian', 'Pizzeria', 'Vegetarian', 'Organic' ],
	starterMenu: [ 'Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad' ],
	mainMenu: [ 'Pizza', 'Pasta', 'Risotto' ],

	//return the starter and main dish according to their index
	order: function(starterIndex, mainIndex) {
		return [ this.starterMenu[starterIndex], this.mainMenu[mainIndex] ];
	}
};

// Take out the 1st and 2nd category in 'restaurant' object
let [ firstCategory, secondCategory ] = restaurant.categories;
console.log(firstCategory, secondCategory); //Italian, Pizzeria

// Take out the 1st and 3rd category in 'restaurant' object
[ firstCategory, , thirdCategory ] = restaurant.categories;
console.log(firstCategory, thirdCategory); //Italian, Vegetarian

// Changing values: Swap 1st and 2nd category
//// Solution 1:
// const temp = firstCategory;
// firstCategory = secondCategory;
// secondCategory = temp;
// console.log(firstCategory, secondCategory); //Pizzeria, Italian

//// Solution 2:
[ firstCategory, secondCategory ] = [ secondCategory, firstCategory ];
console.log(firstCategory, secondCategory); //Pizzeria, Italian

// Destructuring arrays returned from a function
const [ starterDish, mainDish ] = restaurant.order(1, 0); //take starter dish with index = 1 and main dish with index = 0
console.log(starterDish, mainDish); //Bruschetta, Pizza

// Destructuring nested arrays
const nested = [ 2, 4, [ 5, 6 ] ];
let [ a, b, c ] = nested;
console.log(a, c); //2, [5, 6]

let [ , , [ c1, c2 ] ] = nested;
console.log(c1, c2); //5, 6

[ a, b, [ c1, c2 ] ] = nested;
console.log(a, b, c1, c2); //2, 4, 5, 6

// Destructuring arrays with default values (used when we dont know exactly how many elements in the array)
let [ x, y, z ] = [ 0, 9 ];
console.log(x, y, z); //0, 9, undefined

[ x = 1, y = 1, z = 1 ] = [ 8, 9 ]; //default = 1 for undefined values
console.log(x, y, z); //8, 9, 1

/* Lec103. Destructuring objects */
// NOTE: Objects are not iterable (must use Object.entries() to convert to array to do looping)
restaurant = {
	name: 'Classico Italiano',
	location: 'Via Angelo Tavanti 23, Firenze, Italy',
	categories: [ 'Italian', 'Pizzeria', 'Vegetarian', 'Organic' ],
	starterMenu: [ 'Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad' ],
	mainMenu: [ 'Pizza', 'Pasta', 'Risotto' ],

	openingHours: {
		thu: {
			open: 12,
			close: 22
		},
		fri: {
			open: 11,
			close: 23
		},
		sat: {
			open: 0, // Open 24 hours
			close: 24
		}
	},

	//return the starter and main dish according to their index
	order: function(starterIndex, mainIndex) {
		return [ this.starterMenu[starterIndex], this.mainMenu[mainIndex] ];
	},

	//destructuring object when parsing to function, with default values
	orderDelivery: function({ starterIndex = 0, mainIndex = 0, time = '08:03', address }) {
		console.log(
			`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[
				mainIndex
			]} will be delivered to ${address} at ${time}`
		);
	}
};

// Take out the 'name', 'openingHours' and 'categories' in 'restaurant' object
// NOTE: order of properties is not important, but must provide the exact property name
let { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// What if we can to change the property names?
const { name: restaurantName, openingHours: hours, categories: tags } = restaurant;
console.log(restaurantName, hours, tags);

// Destructuring objects with default values (used when we dont know exactly the property names)
let { menu = [], starterMenu: starters = [] } = restaurant; //with default
console.log(menu); //menu = []
console.log(starters); //starters = ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"]

let { menu2, starterMenu = [] } = restaurant; //without default
console.log(menu2); //menu2 = undefined

// Reassign variables with object's values
let m = 11;
let n = 99;
console.log(m, n); //11, 99
const obj = { m: 23, n: 7, o: 14 };

// m, n already be defined, but now we want to reassign (overwrite) it with m, n values from 'obj'
({ m, n } = obj); //put the expression inside ()
console.log(m, n); //23, 7

// Destructuring nested objects
// Take out the opening and closing hour on Friday
const { fri: { open, close } } = openingHours;
console.log(open, close); //11, 23

// Change the property name
const { fri: { open: openAt, close: closeAt } } = openingHours;
console.log(openAt, closeAt); //11, 23

// Calling function with destructured object parsing to the function
restaurant.orderDelivery({
	time: '23:28',
	address: '123 Street 01',
	mainIndex: 2,
	starterIndex: 1
});
restaurant.orderDelivery({
	address: '456 Street 02'
});

/* Lec105. The Spread Operator (...) */
// Unpacking all elements of an array at once
const arr1 = [ 4, 5, 6, 7 ];
const badNewArr = [ 1, 2, 3, arr1[0], arr1[1], arr1[2], arr1[3] ]; //adding 3 new elements to arr1
console.log(badNewArr); //[ 1, 2, 3, 4, 5, 6, 7 ]

// Do faster using spread operator (...)
const newArr = [ 1, 2, 3, ...arr1 ]; //...arr1: all elements in arr1 separated by ','
console.log(newArr); //[ 1, 2, 3, 4, 5, 6, 7 ]

// NOTE:
const newArrNested = [ 1, 2, 3, arr1 ]; //add the WHOLE array [ 4, 5, 6, 7 ] to [ 1, 2, 3]
console.log(newArrNested); //[ 1, 2, 3, [4, 5, 6, 7 ]]

console.log(arr1); //[4, 5, 6, 7]
console.log(...arr1); //4 5 6 7
console.log(4, 5, 6, 7); //4 5 6 7

// (...) is useful when parsing arguments into functions or any time we want variables separated by ','
const newMenu = [ ...restaurant.mainMenu, 'Gnocci' ]; //add new dish 'Gnocci' to the main menu
console.log('newMenu:', newMenu);

// Parsing arguments into function using (...) operator
const buyFruits = function(fruit1, fruit2, fruit3) {
	console.log(`You have bought: ${fruit1}, ${fruit2}, ${fruit3}`);
};
//const fruits = [ prompt('Fruit #1:'), prompt('Fruit #2:'), prompt('Fruit #3:') ];
const fruits = [ 'Banana', 'Grape', 'Cherry' ];
//buyFruits(fruits[0], fruits[1], fruits[2]); //old style
buyFruits(...fruits); //parsing arguments into function using (...) operator

// Duplicate array
const newMenu_Copy = [ ...newMenu ];
console.log('newMenu_Copy:', newMenu_Copy);

// Merge 2 arrays
const newMenu_Merged = [ ...restaurant.starterMenu, ...restaurant.mainMenu ];
console.log('newMenu_Merged:', newMenu_Merged);

// NOTE: (...) can be used with iterable types: arrays, strings, maps, sets (even objects in ES2018)
//// (...) with strings
const str = 'Kathy';
const letters = [ ...str, ...'Pham' ];
console.log(letters); //["K", "a", "t", "h", "y", "P", "h", "a", "m"]
console.log(...str); //K a t h y

//// (...) with objects
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log('newRestaurant:', newRestaurant);

//// Duplicate objects
const restaurantCopy = { ...newRestaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name); //still remains original values: 'Classico Italiano'

/* Lec106. Rest Pattern and Parameters */
// Same syntax as Spread (...) operator, but do the opposite
// => Collect multiple elements to make an array

//// Spread (...) operator is on the RIGHT of '='
const arr2 = [ 1, 2, ...[ 3, 4 ] ]; //spread -> unpacking [3, 4] to 3, 4
console.log(arr2);

//// Rest (...) operator is on the LEFT of '='
//// NOTE: (...) must be the last element
const [ p, q, ...others ] = [ 1, 2, 3, 4, 5 ];
console.log(p, q, others); //packing [3, 4, 5] to an array 'others'

const [ pizza, risotto, ...otherFood ] = [ ...restaurant.mainMenu, ...restaurant.starterMenu ];
console.log(...restaurant.mainMenu, ...restaurant.starterMenu); //Pizza Pasta Risotto Focaccia Bruschetta Garlic Bread Caprese Salad
console.log(otherFood); //Risotto Focaccia Bruschetta Garlic Bread Caprese Salad

restaurant = {
	openingHours: {
		thu: {
			open: 12,
			close: 22
		},
		fri: {
			open: 11,
			close: 23
		},
		sat: {
			open: 0, // Open 24 hours
			close: 24
		}
	}
};
// Destructuring objects using Rest (...) operator
//// Take out opening hours of Saturday, and the rest are weekdays
const { sat, ...weekdays } = restaurant.openingHours;
console.log(sat, weekdays);

// Packing all of the function's arguments into an array (while the Spread (...) operator is used to parse arguments to the function)
const add = function(...numbers) {
	//Rest (...) operator: packing arguments to an array 'numbers'
	let sum = 0;
	for (let i = 0; i < numbers.length; i++) sum += numbers[i];
	console.log(numbers);
	console.log('Sum =', sum);
};
//// Using (...), we can parse any number of arguments to the function
add(2, 3); //[2, 3] - 2 arguments
add(5, 4, 7, 2); //[5, 4, 7, 2] - 4 arguments
add(8, 4, 1, 4, 2, 7, 9); //[8, 4, 1, 4, 2, 7, 9] - 7 arguments
const args = [ 1, 2, 3 ];
add(...args); //Spread (...) operator: unpacking the 'args' list to become the function's arguments

restaurant = {
	name: 'Classico Italiano',
	location: 'Via Angelo Tavanti 23, Firenze, Italy',
	categories: [ 'Italian', 'Pizzeria', 'Vegetarian', 'Organic' ],
	starterMenu: [ 'Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad' ],
	mainMenu: [ 'Pizza', 'Pasta', 'Risotto' ],

	openingHours: {
		thu: {
			open: 12,
			close: 22
		},
		fri: {
			open: 11,
			close: 23
		},
		sat: {
			open: 0, // Open 24 hours
			close: 24
		}
	},

	//return the starter and main dish according to their index
	order: function(starterIndex, mainIndex) {
		return [ this.starterMenu[starterIndex], this.mainMenu[mainIndex] ];
	},

	//destructuring object when parsing to function, with default values
	orderDelivery: function({ starterIndex = 0, mainIndex = 0, time = '08:03', address }) {
		console.log(
			`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[
				mainIndex
			]} will be delivered to ${address} at ${time}`
		);
	},

	orderPizza: function(mainIngredient, ...otherIngredients) {
		console.log(`Main ingredient: ${mainIngredient}`);
		console.log('Other ingredients:', otherIngredients);
	}
};
restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach'); //Main ingredient: 'mushrooms', others: ['onion', 'olives', 'spinach']
restaurant.orderPizza('mushrooms'); //Main ingredient: 'mushrooms', others: []

/* Lec107. Short Circuiting (&& and ||) */
// &&, || can:
//// Use any data types
//// Return any data types

console.log('-------- OR --------');
//// 'OR' Short-circuiting: return the 1st truthy value (because 1 truthy value -> the whole condition will be true), if they are all falsy values, then return the last one
console.log(3 || 'Kathy'); //3 (3 is the 1st truthy value)
console.log(undefined || 'Kathy'); //'Kathy' (undefined is a falsy value)
console.log(0 || true); //true (0 is a falsy value)
console.log(null || undefined); //undefined (all are falsy value => return the last one)
console.log('' || 0); //0 (all are falsy value => return the last one)
console.log(undefined || '' || 0 || 'Hello' || 10 || null || 'Kathy'); //'Hello' (the 1st truthy value)

//// Practical example with 'OR' Short-circuiting: define default values
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10; //10: the number of guests will be default 10 if 'numGuests' is undefined
console.log(guests1);

restaurant.numGuests = 30;
const guests2 = restaurant.numGuests || 10; //30
console.log(guests2);

// NOTE:
restaurant.numGuests = 0;
const guests3 = restaurant.numGuests || 10; //10: 0 is falsy value -> be careful!! (see Lec108. for better solution)
console.log(guests3);

console.log('-------- AND --------');
//// 'AND' Short-circuiting: return the 1st falsy value (because 1 falsy value -> the whole condition will be false), if they are all truthy values, then return the last one
console.log(undefined && 'Kathy'); //undefined (undefined is a falsy value)
console.log(true && 0); //0 (0 is a falsy value)
console.log('' && undefined && null); //'' ('' is the 1st falsy value)
console.log('Kathy' && 22); //22 (all are truthy values => return the last one)
console.log('Hello' && 100 && undefined && '' && 0 && 30 && null); //undefined (the 1st falsy value)

//// Practical example with 'AND' Short-circuiting: check if an object/function/variable/etc exists and execute sth if it exists
////// Check if a function property exists, if exists, then call it
if (restaurant.orderPizza) {
	// Method #1: using 'if'
	restaurant.orderPizza('mushrooms', 'spinach');
}
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach'); // Method #2: using &&

/* Lec108. The Nullish Coalescing Operator '??' (ES2020, but I still get error Unexpected token) */
// Nullish (falsy) values: null & undefined (0 and '' are truthy)
// restaurant.numGuests = 0;
// const guests4 = restaurant.numGuests ?? 10; //0: works the same as '||', but considers 0 a truthy value
// console.log(guests4);
// console.log(0 ?? undefined); //0
// console.log(null ?? ''); //''
// console.log(null ?? 0); //0

/* Lec110. Looping Arrays: The for-of Loop */
menu = [ ...restaurant.starterMenu, ...restaurant.mainMenu ];
console.log(menu);
// Iterate through all array's elements
for (const item of menu) {
	console.log(item);
}

// Get element's index and value using .entries()
console.log('Your menu contains:\n');
//// Method 1:
// for (const item of menu.entries()) {
// 	//console.log(item); //[0, "Focaccia"], ...
// 	console.log(`${item[0] + 1}: ${item[1]}`);
// }
//// Method 2:
for (const [ index, element ] of menu.entries()) {
	//console.log(item); //[0, "Focaccia"], ...
	console.log(`${index + 1}: ${element}`);
}
console.log(menu.entries()); //Iterator
console.log([ ...menu.entries() ]); //Array: [[0, "Focaccia"], [1, "Bruschetta"], [2, "Garlic Bread"], ...]

/* Lec111. Enhanced Object Literals (ES6) */
const homeTown = {
	street: 'NDC',
	district: 'TP',
	city: 'HCMC'
};
const interests = [ 'Color', 'Movie', 'Song' ];
const kathy = {
	lastName: 'Pham',
	birthYear: 1998,
	school: 'HCMUS',
	graduatationYear: 2020,

	// 1. Add an object to an object with the same name:
	//homeTown: homeTown //old way
	homeTown, //ES6 enhanced object literals

	// 2. Create a function inside an object
	// calcAge: function() {
	// 	console.log(`Your age is: ${2020 - this.birthYear}`);
	// } //old way

	calcAge() {
		console.log(`Your age is: ${2020 - this.birthYear}`);
	}, //ES6 enhanced object literals

	// 3. Compute name of properties
	['favorite' + interests[0]]: 'Red', //favoriteColor
	['favorite' + interests[1]]: 'Titanic', //favoriteMovie
	['favorite' + interests[2]]: 'Dynamite', //favoriteSong
	[`workPlaceYear${2020 + 1}`]: 'Laidon'
};
console.log(kathy);
kathy.calcAge();

/* Lec112. Optional Chaining '.?' (ES2020, but I still get error "You can only use optional-chaining when the 'optionalChaining' plugin is enabled") */
// NOTE: Install npm: npm install
// Install ES2020: npm install ES2020

restaurant = {
	openingHours: {
		thu: {
			open: 12,
			close: 22
		},
		fri: {
			open: 11,
			close: 23
		},
		sat: {
			open: 0, // Open 24 hours
			close: 24
		}
	},
	//return the starter and main dish according to their index
	order: function(starterIndex, mainIndex) {
		return [ this.starterMenu[starterIndex], this.mainMenu[mainIndex] ];
	}
};
// Ex: Suppose we want to print the open hour of the restaurant on Saturday
// -> must exist 'openingHours' property, 'fri' property, and 'open' property
// Checking existence (if clause):
if (restaurant.openingHours && restaurant.openingHours.fri && restaurant.openingHours.fri.open) {
	console.log(restaurant.openingHours.fri.open);
}
// -> This is convenient if there are too many properties to check
// -> Use Optional Chaining
// console.log(restaurant.openingHours.fri?.open); //check if 'mon' property exists, then print 'open'. else, print undefined => result: 11

// console.log(restaurant.openingHours.mon?.open); //check if 'mon' property exists, then print 'open'. else, print undefined => result: undefined

// console.log(restaurant.openHours?.mon?.open); //check if 'openHours' property exists, then check if 'mon' property exists, then print 'open'. else, print undefined => result: undefined

const days = [ 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun' ];
// Check if the restaurant is open on these days

// Use optional chaining for arrays
// for (let day of days) { (//// for-of looping array)
// 	console.log(day)
// // Check if openingHours[day] exists. If so, get the 'open' property
// 	const open = restaurant.openingHours[day]?.open ?? null; // use Nullish ?? operator (because open can be 0)
// 	if(open) console.log('The restaurant opens at: ${open} on: ${day}')
//  else console.log('The restaurant closes on: ${day}')
// }

// Use optional chaining for methods
// console.log(restaurant.order?.(0,1) ?? 'Method does not exist.'); //Call function 'order' because it exists
// console.log(restaurant.order?.(0,1) ?? 'Method does not exist.'); //Print 'Method does not exist.' because function 'orderSomething' does not exist

// // Use optional chaining for methods
// console.log(restaurant.order?.(0,1) ?? 'Method does not exist.'); //Call function 'order' because it exists

/* Lec113. Looping objects: Object Keys, Values, and Entries */
console.log('\n----------Lec113. Looping objects: Object Keys, Values, and Entries----------');

// Property NAMES: Object.keys()
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days: `;
for (const day of properties) {
	openStr += `${day}, `;
}
console.log(openStr);

// Property VALUES: Object.values()
const values = Object.values(openingHours);
console.log(values);

for (const hour of values) {
	console.log(hour); //{open: 12, close: 22}
}

// ENTIRE object: Object.entries() -> Return an array
const entries = Object.entries(openingHours);
console.log(entries);
// [
// 	[
// 		thu: {
// 			open: 12,
// 			close: 22
// 		}
// 	], ...
// ];
for (const [ key, { open, close } ] of entries) {
	console.log(`On ${key} we open at ${open} o'clock and close at ${close} o'clock`);
}

/* Lec114. Sets */
console.log('\n----------Lec114. Sets----------');
// Collections of unique values (can hold multiple data types)
const ordersSet = new Set([ 'Pasta', 'Pizza', 'Risotto', 'Pasta', 'Pizza' ]);
console.log(ordersSet); //{"Pasta", "Pizza", "Risotto"} => removed duplicated values

// Create a set from a string -> Unique characters in the string
console.log(new Set('a string')); // {"a", " ", "s", "t", "r", "i", "n", "g"}

// Number of elements in the set
console.log(ordersSet.size);

// Check if an element exists in the set
console.log(ordersSet.has('Pizza')); //true
console.log(ordersSet.has('Pie')); //false

// Add new element to the set
ordersSet.add('Bread');
ordersSet.add('Bread');
console.log(ordersSet); //{"Pasta", "Pizza", "Risotto", "Bread"} => removed duplicated values

// Delete an element in the set
ordersSet.delete('Pizza');
console.log(ordersSet); //{"Pasta", "Risotto", "Bread"}

// Delete all element in the set
//ordersSet.clear();
//console.log(ordersSet); //{}

// Take out an element is not supported in set (can't use ordersSet[0])

// Looping
let i = 1;
for (const order of ordersSet) {
	console.log(`${i++} ${order}`);
}

// Array -> Set ; Set -> Array
const staff = [ 'Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Manager' ];
const staffUnique = new Set(staff); //Array -> Set
console.log(staffUnique);

const staffArray = [ ...staffUnique ]; //Set -> Array (using Spread (...) operator)
console.log(staffArray);

// Fun: How many unique charaters in my name
console.log(new Set('PhamQuynhThi').size); //10

/* Lec116. Maps: Fundamentals */
// Map: Data structure used to map values to keys (like objects, but the keys can have any type)
// Objects: keys are strings
// Maps: keys can be any type (can be objects, arrays, maps, ...)

//// Initialize the map
const restaurantMap = new Map();

//// Fill the map with elements
restaurantMap.set('name', 'Classico Italiano'); //key with string type
restaurantMap.set(1, '1st Location'); //key with number type
restaurantMap.set([ 'John', 'Mary' ], 'Owner'); //key with array type

console.log(restaurantMap.set(2, '2nd Location')); //.set() return new Map with new element: {"name" => "Classico Italiano", 1 => "1st Location", 2 => "2nd Location"}

restaurantMap
	.set('Categories', [ 'Italian', 'Pizzeria', 'Vegetarian', 'Organic' ])
	.set('open', 10)
	.set('close', 23)
	.set(true, 'We are open :)')
	.set(false, 'We are closed :(');
console.log(restaurantMap);

// Take out an element in the map: use .get() and parse in the key name
console.log(restaurantMap.get('name')); //'Classico Italiano'
console.log(restaurantMap.get(1)); //1st Location
console.log(restaurantMap.get(false)); //'We are closed :('

// Check if the restaurant is still open (if time between open and close -> true. else -> false)
const time = 21;
console.log(restaurantMap.get(time > restaurantMap.get('open') && time < restaurantMap.get('close'))); //We are closed :(

// Check if a map contains a certain key
console.log(restaurantMap.has('Categories')); //true
console.log(restaurantMap.has('Address')); //false

// Number of elements in the map
console.log(restaurantMap.size);

// Delete an element in a map by key
restaurantMap.delete(2);
console.log(restaurantMap);

// Delete all element in the set
//restaurantMap.clear();
//console.log(restaurantMap); //{}

// Take out element which key is an array
console.log(restaurantMap.set([ 1, 2 ], 'test'));
console.log(restaurantMap.get([ 1, 2 ])); //undefined. This [1, 2] and the [1, 2] in the map is 2 different things, with different address in the heap

//// Solution: Store the key in a variable
const arrKey = [ 'abc', true, 123 ];
console.log(restaurantMap.set(arrKey, 'test'));
console.log(restaurantMap.get(arrKey));

restaurantMap.set(document.querySelector('h1'), 'Heading');
console.log(restaurantMap);

/* Lec117. Maps: Iteration */
// Creating new map with multiple elements
const questionMap = new Map([
	[ 'question', 'What is the best programming language in the world?' ],
	[ 1, 'C' ],
	[ 2, 'Java' ],
	[ 3, 'Javascript' ],
	[ 4, 'Python' ],
	[ 'correct', 3 ],
	[ true, 'Correct 🎉' ],
	[ false, 'Try again 😕' ]
]); //the structure is similar to Object.entries()
console.log(questionMap);
console.log(Object.entries(openingHours));

// Convert Object -> Map
const openingHoursMap = new Map(Object.entries(openingHours));
console.log(openingHoursMap);

// Looping (Maps are iterable, so we can loop through element using for-of)
console.log(questionMap.get('question'));
for (const [ key, value ] of questionMap) {
	if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
const answer = 3; //Number(prompt('Your answer: '));
console.log(answer);

console.log(questionMap.get(answer === questionMap.get('correct')));
//window.alert(questionMap.get(answer === questionMap.get('correct')));

// Convert Map -> Array
console.log([ ...openingHoursMap ]);

// Map's methods: return a MapIterator -> have to convert to array
console.log(questionMap.entries());
console.log([ ...questionMap.entries() ]); //convert to array

console.log(questionMap.keys());
console.log([ ...questionMap.keys() ]); //convert to array

console.log(questionMap.values());
console.log([ ...questionMap.values() ]); //convert to array

/* Lec118. Summary: Which data structure to use? */
// Sources of data:
//// 1. Source code
//// 2. DOM elements
//// 3. Web API (Application Programming Interface): JSON ~ Javscript's Objects and Arrays

// Javascript's built-in data structure: When to use which?
//// Simple list: Arrays or Sets
////// Arrays vs. Sets:
let arrTasks = [ 'Code', 'Eat', 'Code' ],
	setTasks = new Set([ 'Code', 'Eat', 'Sleep' ]);
//////// Arrays: use when you need ORDERED list of values, can contain duplicates, and when you need to manipulate data (because there are many useful array methods)
//////// Sets: use when you need UNIQUE values, high-performance (search and delete items in sets can be up to 10 times faster than in arrays), and remove duplicates from arrays

//// Key/Value pairs: Objects or Maps (keys describe values)
let objTasks = { task: 'Code', date: 'today', repeat: true },
	mapTasks = new Map([ [ ('task', 'Code') ], [ 'date', 'today' ], [ false, 'Start coding!' ] ]);
//////// Objects: more traditional key/value store, easier to write and access values with "." and "[]", can use 'this' keyword. Use when you need to include functions (methods), when working with JSON (can convert to map)

//////// Maps: better performance, keys can have any data type, easy to iterate, easy to compute size. Use when you simply need to map key to values, when you need keys that are not strings

// Advanced Data structures:
//// Built-in: WeakMap, WeakSet
//// Non Built-in: Stacks, Queues, Linked lists, trees, hash tables

/* Lec120. Working with Strings - Part 1 */
const airline = 'TAP Air Portugal';
const plane = 'A320';
console.log(plane[0]);
console.log(plane[1]);
console.log('A320'[0]);

// Find length of a string
console.log(plane.length);

// Find the 1st index of a character in a string
console.log(airline.indexOf('A')); //0
console.log(airline.indexOf('B')); //-1

// Find the last index of a character in a string
console.log(airline.lastIndexOf('A')); //4

// Find the 1st index of a substring in a string
console.log(airline.indexOf('AP')); //1
console.log(airline.indexOf('Portugal')); //8
console.log(airline.indexOf('portugal')); //-1

// Extract substring starting from an index
console.log(airline.slice(4)); //'Air Portugal': starts at index = 4 to the end of the string
console.log(airline.slice(4, 7)); //'Air': starts at index = 4 to index = 7

// Extract 1st word
console.log(airline.slice(0, airline.indexOf(' '))); //'TAP'

// Extract last word
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); //'Portugal'

// Extract the last n characters (go from the end)
console.log(airline.slice(-7)); //'Portugal': the last 7 characters

console.log(airline.slice(4, -2)); //'Air Portug': from index = 1 to index = length - 2

// Example
const checkMiddleSeat = function(seat) {
	// B and E are middle seats
	const letter = seat.slice(-1); //get the last character
	letter === 'B' || letter === 'E' ? console.log(`You got the middle seat`) : console.log(`You got a lucky seat`);
};
checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

// Why Strings are not objects but still have methods?
// Javascript converts Strings to Objects behind the scene, and turn back to Strings when finish
console.log(new String('ABC')); //{ 0: "A", 1: "B", 2: "C"}
console.log(typeof new String('ABC')); //object

/* Lec121. Working with Strings - Part 2 */

console.log(airline.toLowerCase()); //Convert to lower case
console.log('hello'.toUpperCase()); //Convert to upper case

// Fix capitalization
const myName = 'kAtHy';
const myNameCorrect = myName[0].toUpperCase() + myName.toLowerCase().slice(1);
console.log(myNameCorrect);

// Check email address
const exactEmail = 'kathy@example.com';
const loginEmail = '  kAthY@Example.Com \n';

////.trim(): remove space and \n at the begin and end of string
const fixedEmail = loginEmail.trim().toLowerCase();

console.log(fixedEmail);
console.log(fixedEmail === exactEmail); //compare

// Replace and replace all (case sentitive)
//// Convert price
const priceGB = '288,97£';
const priceUS_1 = priceGB.replace('£', '$').replace(',', '.');
const priceUS_2 = priceUS_1.slice(-1) + priceUS_1.slice(0, -1);
console.log(priceUS_2);

//// Replace all
const announcement = 'All passengers come to boarding door 23. Boarding door 23!';
console.log(announcement.replace('All', 'Male'));
console.log(announcement.replaceAll('door', 'gate'));
console.log(announcement.replace(/door/g, 'gate')); //use regular expression (g: global)

// Check if string includes a substring: .includes()
const planeModel = 'Airbus A320neo';
console.log(planeModel.includes('neo')); //true
console.log(planeModel.includes('B')); //false

// Check if string starts/ends with a substring: .startsWith()
console.log(planeModel.startsWith('Air')); //true
console.log(planeModel.startsWith('A320')); //false
console.log(planeModel.endsWith('neo')); //true
console.log(planeModel.endsWith('A320')); //false

/* Lec122. Working with Strings - Part 3 */
// Split
console.log('The_Most_Beautiful_Moment_In_Life'.split('_'));
const [ myFirstName, myLastName ] = 'Kathy Pham'.split(' ');
console.log(myFirstName, myLastName);

// Join
const newName = [ 'Ms.', myFirstName, myLastName.toUpperCase() ].join('---');
console.log(newName);

// Practice: Capitalize the 1st character of a name
const capitalizeName = function(name) {
	const names = name.split(' '),
		result = [];
	for (const word of names) {
		// Capitalize the 1st character

		//// Method 1
		//result.push(word[0].toUpperCase() + word.slice(1).toLowerCase());

		//// Method 2
		result.push(word.replace(word[0], word[0].toUpperCase()));
	}
	return result.join(' ');
};
const name1 = 'jessica anna smith davis';
console.log(capitalizeName(name1)); //Jessica Anna Smith Davis

// Padding strings (add a number of characters to the string until it has a certain desired length)
const message = 'Go to gate 23';
console.log(message.padStart(25, '-')); //add '-' at the start of the string to have length = 25
console.log(message.padEnd(25, '!')); //add '!' at the end of the string to have length = 25

// Practice: Hide credit card number digits, just keep the last 3 digits
const maskCreditCard = function(number) {
	const strNumber = number + ''; //convert number to string
	const masked = strNumber.slice(-3); //take the last 3 digits
	console.log(masked);
	return masked.padStart(strNumber.length, '*');
};
console.log(maskCreditCard('0335767333')); ///*******333

// Repeat: repeat same string multiple times
const repeatingMessage = 'Hello...';
console.log(repeatingMessage.repeat(5)); //'Hello...Hello...Hello...Hello...Hello...': repeat 5 times
const customersInLine = function(n_male, n_female) {
	console.log(`There are ${n_male} male customers in line ${'🙎‍♂️'.repeat(n_male)}`);
	console.log(`There are ${n_female} female customers in line ${'🙎‍♀️'.repeat(n_female)}`);
};
customersInLine(3, 5);
