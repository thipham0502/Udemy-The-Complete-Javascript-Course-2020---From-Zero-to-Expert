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

/* Lec149. The filter method */
console.log('----------Lec149----------');
const deposits = movements.filter(function(mov) {
	// Filter to keep only positive movements
	return mov > 0;
});
console.log(deposits);

// same as:
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

// NOTE: Should use methods (map, filter, ...) instead of for-of because we can make chain of methods (eg: arr.filter().map().join()...)

const withdrawals = movements.filter((mov) => mov < 0);
// Filter to keep only negative movements
console.log(withdrawals);

/* Lec150. The reduce Method */
// Return 1 calculated value
console.log('----------Lec150----------');

// reduce: 2 arguments:
//// callback function(<accumulator: the return value>, <current value>, <index>, <whole array>)
//// initial value for accumulator
const balance = movements.reduce(function(acc, curr, i, arr) {
	console.log(`Iteration ${i + 1}: acc = ${acc} + ${curr} = ${acc + curr}`);
	// sum up all movements
	return acc + curr;
}, 0);
console.log(balance);

// same as:
let balanceFor = 0;
for (const mov of movements) balanceFor += mov;
console.log(balanceFor);

// Use arrow function for short
const balanceArrow = movements.reduce((acc, curr) => acc + curr, 0);
console.log(balanceArrow);

// Get max value in 'movements' array
const maxBalance = movements.reduce((acc, mov) => (acc > mov ? acc : mov), movements[0]);
console.log(movements);
console.log(maxBalance);

/* Lec152. Chain Methods */
console.log('----------Lec152----------');
// May cause performance issues if array is too large
// Take all movement deposits (> 0) -> Convert EUR movements to USD -> Add them all up
const sumUSDDeposits = movements
	.filter((mov) => mov > 0)
	.map((eurMov) => eurMov * 1.1)
	.reduce((acc, mov) => acc + mov, 0);
console.log(sumUSDDeposits);

// Doing this way is more easy to debug
const sumUSDDeposits2 = movements
	.filter((mov, i, arr) => {
		console.log('Filter:', arr);
		return mov > 0;
	})
	.map((eurMov, i, arr) => {
		console.log('Map:', arr);
		return eurMov * 1.1;
	})
	.reduce((acc, mov) => acc + mov, 0);
console.log(sumUSDDeposits2);

/* Lec154. The find Method */
console.log('----------Lec154----------');
// Return the 1st element of the array that satifies a certain condition (return 1 element of the array)
console.log(movements);
const firstWithdrawal = movements.find((mov) => mov < 0);
console.log(firstWithdrawal);

/* Lec158. some and every */
console.log('----------Lec158----------');
console.log(movements);

// includes(): check if an element exists in the array (element must be exactly EQUAL)
console.log(movements.includes(-130)); //true

// some(): check if there are ANY elements satisfy a certain CONDITION
//// Ex: check if there are any positive movements
// const anyDeposits = movements.some(function(mov) {
// 	return mov > 0;
// });
const anyDeposits = movements.some((mov) => mov > 0); //use arrow function for short
console.log(anyDeposits); //true

// every(): check if EVERY element satisfy a certain CONDITION
// returns true if all the elements in the array satisfy the condition
//// Ex: check if every movement is positive movement
console.log(movements.every((mov) => mov > 0)); //false

// Same as using Separate Callback:
const depositCondition = (mov) => mov > 0;
console.log(movements.every(depositCondition));

// Reuse Separate Callback (D.R.Y. Dont Repeat Yourself)
console.log(movements.some(depositCondition));
console.log(movements.filter(depositCondition));

//// Ex: check if every movement is a number
console.log(movements.every((mov) => typeof mov === 'number')); //true

/* Lec159. flat and flatMap (ES2019) */
console.log('----------Lec159----------');
// Convert nested array to flat array (flatten arrays), but only remove 1 [] level at a time
const nestedArr = [ [ 1, 2, 3 ], [ 4, 5, 6 ], 7, 8 ];
console.log(nestedArr.flat()); //[1, 2, 3, 4, 5, 6, 7, 8]

const deeperNestedArr = [ [ [ 1, 2 ], 3 ], [ 4, [ 5, 6 ] ], 7, 8 ];
console.log(deeperNestedArr.flat()); //// Remove 1st [] level --> [[1, 2], 3, 4, [5, 6], 7, 8]
console.log(deeperNestedArr.flat().flat()); //// Remove 2 levels --> [1, 2, 3, 4, 5, 6, 7, 8]
//// or we can add depth argument as the number of [] levels we want to flatten the array
console.log(deeperNestedArr.flat(2)); //// Remove 2 levels --> [1, 2, 3, 4, 5, 6, 7, 8]

/* Lec160. Sorting Arrays */
console.log('----------Lec160----------');
// Sorting elements based on strings (default: in ascending orde and alphabetical order a-z 0-9, not by value if array contains numbers)
// Sort strings
const owners = [ 'Jonas', 'Zach', 'Adam', 'Martha' ];
console.log(owners.sort()); //["Adam", "Jonas", "Martha", "Zach"]: sort and CHANGE the orginal array from a-z
console.log(owners); //["Adam", "Jonas", "Martha", "Zach"]

// Sort numbers
console.log(movements); //[200, 450, -400, 3000, -650, -130, 70, 1300]
//console.log(movements.sort()); //[-130, -400, -650, 1300, 200, 3000, 450, 70]: sorting by string characters 0-9, not by value
//// Use callback function with arguments: <current element>, <next element>
//// If function returns a value < 0, then <current element> will stand before <next element> (not change position)
//// Else if function returns a value > 0, then <current element> will stand after <next element> (switch position)
movements.sort(function(curr, next) {
	// Ascending:
	//// if curr < next --> returns value < 0 (Keep the order, curr still stands before next)
	//// else if curr > next --> returns value < 0 (Swicth order, curr will stand after next)
	if (curr < next) return -1; //any value that < 0
	if (curr > next) return 1; //any value that > 0
});
console.log(movements); //[-650, -400, -130, 70, 200, 450, 1300, 3000]

// Improve ascending sort
//// Because: 	(a - b) return positive number if a > b --> Keep the order
//// 			(a - b) return negative number if a < b --> Swicth the order
movements.sort((a, b) => {
	if (a > b) return 1; //a - b > 0 (Keep order)
	if (a < b) return -1; //a - b < 0 (Swicth order)
}); //same as:
movements.sort((a, b) => a - b);
console.log('Improve ascending sort');
console.log(movements); //[-650, -400, -130, 70, 200, 450, 1300, 3000]

// Sort descending
movements.sort((a, b) => {
	if (a > b) return -1;
	if (a < b) return 1;
});

// Improve descending sort
//// Because: 	(b - a) return negative number if a > b --> Switch order
//// 			(b - a) return positive number if a < b --> Keep order
movements.sort((a, b) => {
	if (a > b) return 1; //b - a < 0 (Keep order)
	if (a < b) return -1; //b - a > 0 (Swicth order)
}); //same as:
movements.sort((a, b) => b - a);
console.log('Improve descending sort');
console.log(movements); //[3000, 1300, 450, 200, 70, -130, -400, -650]

/* Lec161. More Ways of Creating and Filling Arrays */
console.log('----------Lec161----------');
// Normal ways to create array with data defined manually
console.log('Normal ways to create array with data defined manually');
console.log([ 1, 2, 3, 4, 5 ]);
console.log(new Array(1, 2, 3, 4, 5));

// new Array(n): Create empty array with length = n
console.log('new Array(n)');
const x = new Array(7);
console.log(x); //[empty x 7]: empty array with 7 elements
// NOTE: we cannot use map() method to fill up x with values
console.log(x.map(() => 4)); //still [empty x 7]

// We can use fill() method instead, to fill up entire array with a value
console.log('.fill()');
x.fill(10); //fill x with only 10
console.log(x); //[10, 10, 10, 10, 10, 10, 10]: array with 7 values of 10

// Same to use Array.from()
console.log('Array.from()');
const y = Array.from({ length: 7 }, () => 10);
console.log(y); //[10, 10, 10, 10, 10, 10, 10]: array with 7 values of 10

console.log('.fill(<value>, <start_index>)');
x.fill(10, 3); //fill x with only 10, starting at index=3
console.log(x); //[empty, empty, empty, 10, 10, 10, 10]: array with 7 values of 10 starting at index=3

console.log('.fill(<value>, <start_index>, <end_index>)');
x.fill(10, 3, 5); //fill x with only 10, starting at index=3
console.log(x); //[empty, empty, empty, 10, 10, empty, empty]: array with 7 values of 10 starting at index=3 to index=4 (not include 5)

// Using fill() with defined array
console.log('.fill() with defined array');
const arr1 = [ 1, 2, 3, 4, 5, 6, 7 ];
arr1.fill(10, 3, 5);
console.log(arr1); //[1, 2, 3, 10, 10, 6, 7]: replace array's values with 10, starting at index=3 to index=4 (not include 5)

// Array.from() with callback function
console.log('Array.from() with callback function');
const z = Array.from({ length: 7 }, (cur, i) => i + 1); //(cur, i): callback function with arguments: <current element>, <index> and return value = i + 1 in each iteration
//const z = Array.from({length: 7}, (_, i) => i + 1); //use underscore ('_') for unnecessary arguments
console.log(z); //[1, 2, 3, 4, 5, 6, 7];

/* Lec162. Summary: Which Array Method to Use? */
console.log('----------Lec162----------');
// What do you actually want to do with your array?
//// You want to mutate (use and change directly) the original array
////// .push(), .unshift(): add to original array at the end/start
////// .pop(), .shift(), .splice(): remove from original array at the end/start/any position
////// .reverse(), .sort(), .fill()

//// You want a new array
////// .map(): computed from original
////// .filter(): filtered using condition
////// .slice(): get portion of original
////// .concat(): adding original to other
////// .flat(), .flatMap(): flattening original (Ex: [1,[2,3],4] --> [1,2,3,4]

//// You want an array index
////// .indexOf(): find by value
////// .findIndex(): find by a test condition in callback function

//// You want an array element
////// .find(): find by a test condition in callback function

//// You want to know if array includes
////// .includes(): check existence by value
////// .some(): check existence by a test condition in callback function (AT LEAST 1 element satisfy condition --> return true)
////// .every(): check existence by a test condition in callback function (ALL elements satisfy condition --> return true)

//// You want to get a new string
////// .join()

//// You want to transform to a value
////// .reduce()

//// You want to loop the array
////// .forEach(): just loop, not create new array
