'use strict';

//const { prototype } = require('module');

/* Lec201. What is Object-Oriented Programming? */
console.log('----------Lec201----------');
// 4 FUNDAMENTAL OOP PRINCIPLES
//// o Abstraction: tính trừu tượng
//// o Encapsulation: tính đóng gói
//// o Inheritance: tính kế thừa
//// o Polymorphism: tính đa hình

// Abstraction: to ignore or to hide details that don't matter, allowing us to get an overview perspective of the thing we're implementing, instead of messing with details that don't really matter
//// Ex: when interacting with the app, users do not care about what codes inside the functions, they just call the functions --> these functions' codes are abstracted away (hidden) from the user

// Encapsulation: to keep properties and methods PRIVATE inside the class, so they aren't accessible from outside --> security & allows to change internal code without the risk of breaking external code. Some methods can be exposed as a public interface (API)

// Inheritance: a child class inherits some properties & methods from the parent's class --> a hierarchical relationship between classes --> allows to REUSE common logic and be able to demonstrate real-world relationships
//// (Ex: Admin class is inherited from User class i.e. Admin is also a User, but with some special properties and methods)

// Polymorphism: a child class can OVERWRITE a method inherited from a parent class (can be more complex than this)
//// (Ex: Admin class's Login() method is different from User class)

/* Lec202. OOP in Javascript */
console.log('----------Lec202----------');
// 'Class' creates 'Instance'
//// Instances/Objects are instantiated (created) from a class
//// --> Instantiation
//// Behaviour (Methods) are copied from class to all instances

// 'Prototype'
//// All objects are linked to a certain prototype object (i.e. each object has a prototype)
//// Prototype contains properties & methods that all the objects linked to it can access and use
//// --> Prototypal Inheritance / Delegation

// Prototype (contains methods) <--(Prototypal Inheritance/Delegation)-- Object (can access methods)
//// NOTE: Prototypal Inheritance is different from the Inheritance of normal OOP
//// Normal OOP's Inheritance: A class inherits from another class

// Ex:
const num = [ 1, 2, 3 ];
num.map((v) => v * 2);
// Actually this map() function is written Array.prototype.map() on MDN
// --> map() is a method of the prototype of all array objects (Array.prototype)
// --> All arrays have access to this function
// i.e Array.prototype is a prototype containing all array methods, including map()
// 'num' variable is linked to Array's prototype --> 'num' array inherits the map() method

// How to create prototypes? How to link objects to prototypes? How to create new objects without having classes?
//// 3 ways of implementing Prototypal Inheritance
////// 1. Constructor functions: technique to create objects programmatically using a function, which will also set the new object's prototype. This is how built-in objects like Arrays, Maps, Sets are actually implemented

////// 2. ES6 Classes: a more modern way of doing OOP in Js (different from classical OOP classes). Behind the scenes, ES6 classes work EXACTLY like constructor functions (also use prototypal inheritance), but they have nicer syntax which makes it easier for newcomers to do OOP in Js

////// 3. Object.create(): the easiest and most straightforward way of linking an object to a prototype object
// NOTE: Prototypal Inheritance still have 4 basic OOP principals

/* Lec203. Constructor Functions and the new Operator */
console.log('----------Lec203----------');
// Constructor Functions are normal function, but we call it with the 'new' operator
// NOTE: Arrow function will not work as a function constructor, because it doésn't have 'this' keyword --> Only use function declarations and function expressions

// Constructor Functions will produce an object
// NOTE: Traditional OOP Js doesn't really have classes, but we can use constructors to simulate classes. Constructor Functions are not really a feature of Js, they are created by developers and everyone just uses them.
const Person = function(firstName, birthYear) {
	console.log(this); //Person{}: empty object

	// Add properties to the empty object --> Instance properties
	this.firstName = firstName;
	this.birthYear = birthYear;

	// Add methods to the empty object
	// NOTE: Don't create methods inside constructors. Because if we create a thousand of instances, then there will be a thousand copies of the method --> Bad performance
	// --> Use prototypes and prototype inheritance instead!
	// this.calcAge = function() {
	// 	console.log(2020 - birthYear);
	// };

	console.log(this); //Person {firstName: "<firstName>", birthYear: <birthYear>}
};

// Constructor Functions are normal function, but we call it with the 'new' operator
//// Create an instance of 'Person'
const kathy = new Person('Kathy', 1998);
console.log(kathy); //Person {firstName: "Kathy", birthYear: 1998}

// What Js do behind the scene?
//// 1. A new empty object is created
//// 2. The function is called, and the 'this' keyword will be set to the newly-created object in step 1
//// 3. The object is linked to a prototype (creates '__proto__' property)
//// 3. The object is returned from the constructor (no need to write 'return' command)

// Check if 'kathy' is an instance of 'Person'
console.log(kathy instanceof Person); //true

const arr = [ 1, 2, 3 ];
console.log(arr instanceof Person); //false
console.log(arr instanceof Array); //true

/* Lec204. Prototypes */
console.log('----------Lec204----------');

// Add methods using prototype --> prevent creating methods inside every object
Person.prototype.calcAge = function() {
	console.log(2020 - this.birthYear);
};
console.log(Person.prototype); //has calcAge() function

kathy.calcAge(); //'kathy' object can access and reuse methods in Person's prototype

console.log(kathy); //not contain calcAge(), but inherits from the prototype in the __proto__ property
console.log(kathy.__proto__); //=== Person.prototype
console.log(kathy.__proto__ === Person.prototype); //true

// Check if Person.prototype is the prototype of 'kathy' object
console.log(Person.prototype.isPrototypeOf(kathy)); //true

console.log(Person.prototype.isPrototypeOf(Person)); //false: 'Person.prototype' is not the prototype of 'Person', but the prototype of instances of 'Person'

// Add properties to prototype
Person.prototype.species = 'Homo Sapiens';
console.log(kathy); //not contain 'species', but inherits from the prototype in the __proto__ property
console.log(kathy.__proto__); //has 'species' property
console.log(kathy.species); //access 'species' property from the prototype

// NOTE: Own properties are ones that are declared directly on the object itself (kathy.firstName, kathy.birthYear) and not include inherited prototype's properties
// Check if a property is an own property
console.log(kathy.hasOwnProperty('firstName')); //true
console.log(kathy.hasOwnProperty('species')); //false

/* Lec205. Prototypal Inheritance and The Prototype Chain */
console.log('----------Lec205----------');
console.log(Person.prototype.constructor); // --> Person() constructor function
console.dir(Person.prototype.constructor); // use .dir() to inspect the function's properties

// Prototype Chain: Object.prototype is the top of the chain (it has no prototype)
// Whenever a property/method is called, Js will look up into the next prototype in the chain to find it
// (similar to scope chain)
//                                                                 null
//                                                                  ^
//                                                                  | .__proto__
//                                                                  |
//  ______________________                                  ____________________
// | Constructor function |                                |      Prototype     |
// |       Object()       |     ------ .prototype ------>  |  Object.prototype  |
// |                      |     <----- .constructor -----  |  __proto__: null   |
// |______________________|                                |____________________|
//                                                                  ^
//                                        Prototypal Inheritance    | .__proto__
//                                                                  |
//  ______________________                                  _______________________________
// | Constructor function |                                |            Prototype          |
// |      Person()        |     ------ .prototype ------>  |         Person.prototype      |
// |                      |                                |  __proto__: Object.prototype  |
// |                      |     <----- .constructor -----  |    (includes calcAge())       |
// |______________________|                                |_______________________________|
//                                                                  ^
//                                        Prototypal Inheritance    | .__proto__
//                                                                  |
//                                                          ____________________________________
//                                                          |               Object              |
//                                                          |  kathy = Kathy {                  |
//                                                          |       birthYear: 1998,            |
//                                                          |       firstName: "Kathy",         |
//                                                          |       __proto__: Person.prototype |
//                                                          |   }                               |
//                                                          |___________________________________|

// Person.prototype is also an object, so it will have a prototype too
// NOTE: Every Javascript object has a prototype
// The propotype of Person.prototype is Object.prototype, and Object.prototype is prototype of Object() Constructor function
// Object() doesn't have
// Object() Constructor function is used when we create an object literal { ... }
// We can create objects by using 'obj = new Object(...)' or obj = { ... }

/* Lec206. Prototypal Inheritance on Built-In Objects */
console.log('----------Lec206----------');
// Reviewing the prototype chain
console.log('----------Reviewing----------');
console.log(kathy.__proto__); //Person.prototype
console.log(kathy.__proto__.__proto__); //Object.prototype
console.log(kathy.__proto__.__proto__.__proto__); //null

// Arrays
console.log('----------Arrays----------');
const arr1 = [ 1, 2, 3, 1, 4, 5, 2 ];
// or const arr1 = new Array(1,2,3) (Array Constructor)
console.log(arr1); //contains __proto__
console.log(arr1.__proto__); //contains all array methods
console.log(arr1.__proto__ === Array.prototype); //true
console.log(arr1.__proto__.__proto__); //Object.prototype

//// Add new method for Array
Array.prototype.unique = function() {
	return [ ...new Set(this) ];
};
console.log(arr1.unique()); //[1, 2, 3, 4, 5]
// NOTE: Not a good idea to change the built-in objects. Because the next version of Js may have method with the same name --> break your code

// DOM objects
const h1 = document.querySelector('h1');
console.dir(h1); //list all methods available
console.log(HTMLHeadingElement.prototype.isPrototypeOf(h1)); //true: h1's prototype is HTMLHeadingElement, and HTMLHeadingElement's prototype is HTMLElement, ...
// Prototype chain: HTMLHeadingElement is child of HTMLElement, HTMLElement is child of Element, Element if child of Node, Node is child of EventTarget, EventTarget is child of Object

/* Lec208. ES6 Classes */
console.log('----------Lec208----------');
// Still implementing Prototypal Inheritance, but simpler syntax (work different from classes of other languages like C++/Java/... but similar syntax)
// Classes are like functions

// 2 ways to create classes:
//// Class expression
// const PersonClass1 = class {};

//// Class declaration
class PersonClass {
	// First, we must add a constructor with arguments are properties for the class
	// Everything created inside constructor is own properties, not included in prototype
	constructor(firstName, birthYear) {
		(this.firstName = firstName), (this.birthYear = birthYear);
	}

	// Add methods to prototype (everything created outside of constructor will be added to the instance's prototype)
	calcAge() {
		console.log(`${this.firstName}'s age is: ${2020 - this.birthYear}`);
	}
	// greet(){
	//     console.log(`Hey ${this.firstName}!`);
	// }
	// NOTE: No comma between methods
}

const thi = new PersonClass('Thi', 1998);
console.log(thi);
thi.calcAge();
console.log(thi.__proto__); //calcAge() is added to 'thi' instance's prototype

// Or you can add methods to prototype like this
PersonClass.prototype.greet = function() {
	console.log(`Hey ${this.firstName}!`);
};
thi.greet();

// NOTE:
//// 1. Classes are not hoisted (cannot be used before declaration)
//// 2. Classes are first-class citizens (i.e. can be returned from functions, can be passed into functions)
//// 3. Classes are executed in strict mode

// Use Constructors to create class like Lec203 or use class {} like Lec208?
// --> Both are fine
// But class {} gather all things together
// while using Constructors is more messy
