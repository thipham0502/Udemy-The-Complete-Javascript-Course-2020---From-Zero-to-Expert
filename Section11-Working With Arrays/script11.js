'use strict';

/////////////////////////////////////////////////
/* Lec140. Simple Array Methods */
console.log('----------Lec140----------');
let arr = [ 'a', 'b', 'c', 'd', 'e' ];

// Slice: extract some elements from the array without changing the array
console.log(arr.slice(2)); //return new array from index = 2
console.log(arr.slice(2, 4)); //return new array from index = 2 to index < 4 (length = 4 - 2 = 2 elements)
console.log(arr.slice(-2)); //return new array from the end (last 2 elements)
console.log(arr.slice(1, -2)); //return new array from index = 1 to index < -2 (except the last 2 element)

//// Can be used to make a shallow copy of arrays
console.log(arr.slice()); // same as:
console.log([ ...arr ]);

// Splice: extract some elements from the array and also change the array (remove the extracted elements)
console.log(arr.splice(2)); //["c", "d", "e"]
console.log(arr); //["a", "b"]
arr.splice(-1);
console.log(arr); //["a"]

//// splice(index, n): extract and remove n elements starting from index
arr = [ 'a', 'b', 'c', 'd', 'e' ];
arr.splice(1, 2); //remove 2 elements starting from index = 1 ('b', 'c' are removed)
console.log(arr); //["a", "d", "e"]

// Reverse: change order
arr = [ 'a', 'b', 'c', 'd', 'e' ];
const arr2 = [ 'j', 'i', 'h', 'g', 'f' ];
console.log(arr2.reverse()); //["f", "g", "h", "i", "j"]
console.log(arr2); //["f", "g", "h", "i", "j"]: reverse() function makes change on the original array

// Concat
const letters = arr.concat(arr2);
console.log(letters); //["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]. same as:
console.log([ ...arr, ...arr2 ]);

// Join
console.log(letters.join(' - '));

/* Lec141. Looping Arrays: forEach */
console.log('----------Lec141----------');

let movements = [ 200, 450, -400, 3000, -650, -130, 70, 1300 ];

// Looping by for-of without index
// NOTE: for-of loop can be stopped by 'break'
console.log('++++++++++Looping by for-of without index++++++++++');
for (const value of movements) {
	if (value > 0) {
		console.log(`You deposited ${value}`);
	} else {
		console.log(`You withdrew ${Math.abs(value)}`);
	}
}

// Looping by forEach without index
// NOTE: forEach loop can NOT be stopped by 'break' (will always loop all elements)
console.log('\n++++++++++Looping by forEach without index++++++++++');
movements.forEach(function(value) {
	if (value > 0) {
		console.log(`You deposited ${value}`);
	} else {
		console.log(`You withdrew ${Math.abs(value)}`);
	}
});

// Looping by for-of with index
console.log('\n++++++++++Looping by for-of with index++++++++++');
for (const [ i, value ] of movements.entries()) {
	if (value > 0) {
		console.log(`${i + 1}. You deposited ${value}`);
	} else {
		console.log(`${i + 1}. You withdrew ${Math.abs(value)}`);
	}
}

// Looping by forEach with index
console.log('\n++++++++++Looping by forEach with index++++++++++');
// The forEach's callback function of arrays can take arguments: current value, current index, entire array
movements.forEach(function(value, i, arr) {
	if (value > 0) {
		console.log(`${i + 1}. You deposited ${value}`);
	} else {
		console.log(`${i + 1}. You withdrew ${Math.abs(value)}`);
	}
	console.log(arr);
});

/* Lec142. forEach with Maps and Sets */
console.log('----------Lec142----------');
// Map
const currencies = new Map([ [ 'USD', 'United States dollar' ], [ 'EUR', 'Euro' ], [ 'GBP', 'Pound sterling' ] ]);
//// The forEach's callback function can take arguments: current value, current key, entire map
currencies.forEach(function(value, key, map) {
	console.log(`${key}: ${value}`);
});

// Set
const currenciesUnique = new Set([ 'USD', 'EUR', 'GBP', 'USD', 'EUR' ]);
console.log(currenciesUnique); //{"USD", "EUR", "GBP"}
//// Sets dont have key/index (or index is same as value)
currenciesUnique.forEach(function(value, _, set) {
	// use '_' for useless variable (completely unnecessary)
	console.log(`${value}: ${value}`);
	console.log(set);
});

/* Lec146. Data Transformations: map, filter, reduce */
console.log('----------Lec146----------');

// Map: Loop over all elements and apply a function to each element (returns new array)

// Filter: filter for elements that satisfy a certain condition (returns new array)

// Reduce: boil all elements down to 1 single value (returns 1 value, ex: adding all elements together)

/* Lec147. The map method */
console.log('----------Lec147----------');

movements = [ 200, 450, -400, 3000, -650, -130, 70, 1300 ]; // in EURO

// Convert movements to USD = 1.1*EUR
const eurToUSD = 1.1;

//// map:
const movementsUSD = movements.map(function(mov) {
	return mov * eurToUSD;
});
const movementsUSDArrow = movements.map((mov) => mov * eurToUSD); //simplify by using arrow function

console.log(movements); //still remain original array
console.log(movementsUSD);
console.log(movementsUSDArrow);

//// for-of:
const movementsUSD2 = [];
for (const mov of movements) {
	movementsUSD2.push(mov * eurToUSD);
}
console.log(movementsUSD2);

//// map (with arguments: value, index, whole array)
const movementsDescription = movements.map((value, i, arr) => {
	//console.log(arr);
	return `${i + 1}. You ${value > 0 ? 'deposited' : 'withdrew'} ${Math.abs(value)}`;
});
console.log(movementsDescription);
