'use strict';

/* Lec92. Scope and the Scope Chain */
function calcAge(birthYear) {
	const age = 2020 - birthYear; //function scoped

	console.log(firstName); //accessible
	//dont use 'name' for variable because 'name' is a special word in Js

	function printAge() {
		const output = `${firstName}, you are ${age}, born in ${birthYear}`; //firstName accessible from the global scope; age, birthYear accessible from the parent function
		console.log(output);

		if (age >= 18) {
			var adult = true;

			const firstName = 'Thi';
			const str = `Oh, and you're an adult, ${firstName}`; //Thi, not Kathy, because it takes value at the current scope
			console.log(str);

			//If 'use strict' mode, then functions can also be block scoped (function inside a block cannot be accessed outside of the block)
			function add(a, b) {
				return a + b;
			}

			console.log(add(2, 3)); //accessible, function 'add' is block scoped
		}
		// console.log(str); //inaccesible, 'str' is block scoped

		console.log(adult); //accessible, declared with 'var' -> ignore block scope (but still affected by function scope)

		// add(2, 3); //inaccessible, function 'add' is block scoped (and we're using 'strict' mode)
	}
	printAge();
	// console.log(adult); //inaccessible, 'adult' is function scoped

	return age;
}

const firstName = 'Kathy'; //global scoped
calcAge(1998);

// console.log(age); //inaccessible (ReferenceError), 'age' is function scoped
// printAge(); //inaccessible (ReferenceError), 'printAge()' is function scoped

/* Lec95. TDZ (Temporal Dead Zone) (let & const) */
console.log(me); //accessible (can be called the before it is defined)

//console.log(job); //inaccessible (ReferenceError: Cannot access 'job' before initialization) -> We are calling 'job' is in its Temporal Dead Zone (cannot be called the before it is defined)

//console.log(year); //inaccessible (ReferenceError: Cannot access 'year' before initialization) -> We are calling 'year' is in its Temporal Dead Zone (cannot be called the before it is defined)

var me = 'Kathy'; //not affected by Temporal Dead Zone
let job = 'Dev';
const year = 1998;

/* Temporal Dead Zone (functions) */
console.log(addDeclaration(2, 3)); //accessible -> We can call the function declaration before it is defined

/*
console.log(addExpression_const(2, 3)); //inaccessible (ReferenceError: Cannot access 'addExpression_const' before initialization) -> We are calling 'addExpression' is in its Temporal Dead Zone (cannot call the before it is defined)

console.log(addArrow_const(2, 3)); //inaccessible (ReferenceError: Cannot access 'addArrow_const' before initialization) -> We are calling 'addArrow' is in its Temporal Dead Zone (cannot call the before it is defined)

console.log(addExpression_var(2, 3)); //inaccessible (TypeError: 'addExpression_var' is not a function) -> addExpression_var is 'undefined'

console.log(addArrow_var(2, 3)); //inaccessible (TypeError: 'addArrow_var' is not a function) -> addExpression_var is 'undefined'
*/
// Declaration style
function addDeclaration(a, b) {
	return a + b;
}

// Expression style with const
const addExpression_const = function(a, b) {
	return a + b;
};

// Expression style with var
var addExpression_var = function(a, b) {
	return a + b;
};

// Arrow style with const
const addArrow_const = (a, b) => a + b;

// Arrow style with var
var addArrow_var = (a, b) => a + b;

/* Global window object */
var x = 10;
let y = 11;
const z = 12;

console.log(window); //window object
console.log(x === window.x); //true: x becomes a property of the window object (declared with 'var')
console.log(y === window.y); //false: y is NOT a property of the window object (declared with 'let')
console.log(z === window.z); //false: z is NOT a property of the window object (declared with 'const')

console.log(addExpression_var === window.addExpression_var); //true: addExpression_var becomes a property of the window object (declared with 'var')
console.log(addExpression_var === window.addExpression_var); //true: addExpression_var becomes a property of the window object (declared with 'var')

/* Lec96. 'this' keyword */
// Its value is only assigned when the function is actually called
// For Arrow functions, 'this' will be of the surrounding (parent) function
// For Event listener, 'this' is the DOM element of the handler

console.log(this); //'this' in the global scope is the global window object

// Regular function call in 'strict' mode: 'this' === undefined
const calcAge_Regular = function(birthYear) {
	console.log(2020 - birthYear);
	console.log(this); //'this' === undefined
};
calcAge_Regular(1998); //undefined

// Arrow function: 'this' get the 'this' of the parent's function -> 'this' in the global scope -> the global window object
const calcAge_Arrow = (birthYear) => {
	console.log(2020 - birthYear);
	console.log(this); //'this' === window object
};
calcAge_Arrow(1998); //undefined

// Function is a method of an object -> 'this' === the object calling it
const kathy = {
	myName: 'Kathy',
	year: 1998,
	calcAge_Object: function() {
		console.log(this); //'this' === the object calling it
		console.log(`${this.myName} is ${2020 - this.year} years old.`);
	}
};
kathy.calcAge_Object(); //'Kathy is 22 years old.'

// Copy method of object A to object B
const sean = {
	myName: 'Sean',
	year: 1991
};
sean.calcAge = kathy.calcAge_Object; //copy
sean.calcAge(); //'Sean is 29 years old.'

const func = kathy.calcAge_Object;
//func(); //cannot access 'this.myName', 'this.year' because no object is calling 'func' ('this' === undefined) / same as the regular function call

/* Lec98. Regular Functions vs. Arrow Functions */
const john = {
	lastName: 'Michael',
	year: 1997,
	calcAge1: function() {
		//console.log(this); //'this' === the object calling it
		console.log(`${this.lastName} is ${2020 - this.year} years old.`);

		// Regular function inside method: 'this' still === undefined
		const isAdult = function() {
			console.log(this); //undefined
			console.log(2020 - this.year >= 18 ? `${this.lastName} is an adult` : `${this.lastName} is not an adult`); //cannot access 'this.year', 'this.lastName'
		};
		isAdult(); //Regular function call (no object is calling it -> this === undefined)
	},
	calcAge2: function() {
		const self = this; //self (that) = this = object 'john' (save/preserve the 'this' value so that we can use it in the regular function 'isAdult')

		// Regular function inside method: 'this' still === undefined
		const isAdult = function() {
			//console.log(this); //undefined
			console.log(self); //object 'john'
			console.log(2020 - self.year >= 18 ? `${self.lastName} is an adult` : `${self.lastName} is not an adult`); //'self.year' = 1997, 'self.lastName' = 'Michael'
		};
		isAdult(); //No error
	},
	calcAge3: function() {
		// Arrow function inside method: 'this' from the parent scope === 'john' object
		const isAdult = () => {
			console.log(this); //'john' object
			console.log(2020 - this.year >= 18 ? `${this.lastName} is an adult` : `${this.lastName} is not an adult`); //'this.year' = 1997, 'this.lastName' = 'Michael'
		};
		isAdult(); //No error
	},

	//Arrow function: 'this' get the 'this' of the parent's function -> 'this' is the global window object -> window object has no variable lastName -> undefined (NOTE: Object is not a scope)
	greet: () => console.log(`Hey ${this.lastName}!`) //this.lastName === undefined
};
john.greet(); //'Hey undefined!'
console.log(this.lastName); //window.lastName === undefined

// Define a variable with 'var' -> window.lastName can be called
var lastName = 'Park'; //create a property on the global window object
john.greet(); //Hey Park!
console.log(this);

//john.calcAge1(); //TypeError: Cannot read property 'year' of undefined (error at the 'isAdult' function)

john.calcAge2(); //No error

/* 'arguments' keyword */
// Using 'arguments' keyword in regular function
function addDeclaration2(a, b) {
	console.log(arguments);
	return a + b;
}
addDeclaration2(1, 2); //[1, 2]

// Using 'arguments' keyword in expression function
var addExpression = function(a, b) {
	console.log(arguments);
	return a + b;
};
addExpression(2, 3); //[2, 3]
addExpression(2, 3, 4, 5); //[2, 3, 4, 5] (even though the function only has 2 parameters)
//=> We can loop over this list of arguments (parameters) to do calculations

// Using 'arguments' keyword in arrow function -> Error!
var addArrow = (a, b) => {
	console.log(arguments);
	return a + b;
};
//addArrow(2, 3); //ReferenceError: arguments is not defined

/* Lec99. Primitives vs. Objects (Primitive vs. Reference Types) */
// Primitives: numbers, booleans, strings, Undefined, Null, Symbol, BigInt -> Primitive Types
// Objects (anything else): Object, Arrays, Functions, etc. -> Reference Types

// Primitive values are stored in Call Stack (storing its address and value)
// Reference values are stored in Heap (Call Stack will store its address to the heap)
let age = 30;
let oldAge = age; //oldAge = age = 30
age = 31;
console.log(age);
console.log(oldAge);

const myself = {
	name: 'Kathy',
	age: 22
};
const myfriend = myself; //address of 'myself' = address of 'myfriend' (2 variables but point to only 1 object ~ 1 address in the memory heap)
myfriend.name = 'John'; //also change 'name' of 'myself'
console.log('Friend:', myfriend); //name = 'John'
console.log('Me:', myself); //name = 'John'

//Copying objects
const myselfCopy1 = Object.assign({}, myself); //Copy from source object(s) to a target object -> Create new object with same properties
myselfCopy1.name = 'Mary';
console.log(myselfCopy1); //name = 'Mary'

// NOTE: Object.assign is just a shallow copy ie. just copying properties in the first level, cannot copy its child/nested reference values (still point to the same memory address)
const myself2 = {
	name: 'Kathy',
	age: 22,
	family: [ 'Alice', 'Bob' ] //array is an reference value
};
const myselfCopy2 = Object.assign({}, myself2);

myselfCopy2.family.push('Mary'); //also change 'family' of 'myself2'
console.log('myself2:', myself2); //["Alice", "Bob", "Mary"]
console.log('myselfCopy2:', myself2); //["Alice", "Bob", "Mary"]

// NOTE: Can use library Lo-Dash to make deep cloning (copying nested objects)
