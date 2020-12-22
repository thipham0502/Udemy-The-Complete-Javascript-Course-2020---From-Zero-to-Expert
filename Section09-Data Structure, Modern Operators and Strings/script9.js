'use script';

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

/* Lec108. The Nullish Coalescing Operator '??' (ES2020) */
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

/* Lec112. Optional Chaining '.?' */
