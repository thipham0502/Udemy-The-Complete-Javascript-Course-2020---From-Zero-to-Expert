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
const num = [1, 2, 3];
num.map(v => v * 2);
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

const arr = [1, 2, 3];
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
const arr1 = [1, 2, 3, 1, 4, 5, 2];
// or const arr1 = new Array(1,2,3) (Array Constructor)
console.log(arr1); //contains __proto__
console.log(arr1.__proto__); //contains all array methods
console.log(arr1.__proto__ === Array.prototype); //true
console.log(arr1.__proto__.__proto__); //Object.prototype

//// Add new method for Array
Array.prototype.unique = function() {
    return [...new Set(this)];
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
        this.firstName = firstName;
        this.birthYear = birthYear;
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

/* Lec209. Setters and Getters */
console.log('----------Lec209----------');
// Getters and Setters are Accessor Properties
// Others are Data Properties

// Getter and Setter in Objects
const account = {
    owner: 'Kathy',
    movements: [100, 220, 150, 180, 250],

    // Create Getter to get the lastest movements
    get latest() {
        return this.movements.slice(-1).pop();
    },

    set lastest(mov) {
        this.movements.push(mov);
    },
};
console.log(account.latest); //call as a property, not account.latest()

account.lastest = 50; //set property
console.log(account.movements); //[100, 220, 150, 180, 250, 50]

// Getter and Setter in Classes
class PersonClass1 {
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }
    calcAge() {
        console.log(`${this.fullName}'s age is: ${2020 - this.birthYear}`);
    }

    // Getter
    get age() {
        return 2020 - this.birthYear;
    }

    // Setter
    // Change property that already exists in the constructor -> must create different property name
    set fullName(name) {
        if (name.includes(' ')) this._fullName = name;
        //_fullName != fullName
        else console.log(`${name} is not a full name!`);
    }
    // Getter: get value of new property _fullName, but still can access by .fullName
    get fullName() {
        return this._fullName;
    }
}
const kathy1 = new PersonClass1('Kathy Pham', 1998);

console.log(kathy1.age); //22 (call getter as a property of the instance)
console.log(kathy1); //has assessor property 'age'

kathy1.fullName = 'Thi Pham'; //call setter fullName()
console.log(kathy1); //has Data property '_fullName', and Accessor property 'fullName'
console.log(kathy1._fullName); //'Thi Pham'
console.log(kathy1.fullName); //'Thi Pham'

/* Lec210. Static Methods */
console.log('----------Lec210----------');
// A method that is attached to the constructor of a class (the method is in the class's name space and is static on the class's constructor), not to the prototype. --> The class's instances don't inherit this method and so cannot use it

// NOTE: Non-static methods are called Instance methods, they are added to the prototype and can be accessed by instances (Lec204)
// While Static methods are added directly to the class itself, and cannot be accessed by instances

//// Ex: .parseInt() method is attached to Number constructor
//// --> All the instances cannot use this method
console.log(Number.parseInt('12'));
// '12'.parseInt(); //error!

// *Add a static method to the constructor
//// Constructor for class Human
const Human = function(fullName, age) {
    this.fullName = fullName;
    this.age = age;
};
//// Static methods are added directly to the class itself
Human.greet = function() {
    console.log('Hello');
};
Human.greet(); //call static method directly from the class itself

const obama = new Human('Barack Obama', 60);
// obama.greet(); // Instance of class 'Human' cannot access static methods

// *Add a static method to the ES6 class
class Child {
    constructor(gender, birthYear) {
        this.gender = gender;
        this.birthYear = birthYear;
    }
    // Instance method
    calcAge() {
        return now.getFullYear() - this.birthYear;
    }

    // Add static method
    static sayHi() {
        console.log('Hi');
    }
}
Child.sayHi();

const child1 = new Child('Male', 2018);
// child1.sayHello(); //instance cannot access static method

/* Lec211. Object.create */
console.log('----------Lec211----------');
// The 3rd way to implement Prototypal Inheritance (besides Constructor functions and ES6 Classes, but there are no prototype properties
// Using Object.create, we can set the prototype manually to any instances

// Create a prototype
const PersonProto = {
    // Initialize values (just like a constructor)
    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
    calcAge() {
        return new Date().getFullYear() - this.birthYear;
    },
};

// Create new instance linked to the prototype
const person1 = Object.create(PersonProto); //person1 is now an empty object and is linked to PersonProto prototype object, and PersonProto becomes person1's prototype

person1.init('Peter', 1990);
console.log(person1);
console.log(person1.__proto__); //=== PersonProto
console.log(person1.__proto__ === PersonProto); //true
console.log(person1.calcAge());

// *See more: Object.create and Constructor Functions Comparison.png

/* Lec213. Inheritance Between "Classes": Constructor Functions */
console.log('----------Lec213----------');

// Inheritance between Constructor Functions
const Person1 = function(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
};
Person1.prototype.calcAge = function() {
    console.log(new Date().getFullYear() - this.birthYear);
};

//// Student is also a Person, with some similar properties
const Student = function(firstName, birthYear, course) {
    // this.firstName = firstName;
    // this.birthYear = birthYear;

    // *Inherit properties from parent class Person1
    // Person1.(firstName, birthYear); //error, 'this' is undefined
    Person1.call(this, firstName, birthYear); //assign 'this'

    // Add new property
    this.course = course;
};
// *Make Student a sub-class of Person1: do manually using Object.create()
Student.prototype = Object.create(Person1.prototype); //Student inherits Person1's prototype
// Can't use: Student.prototype = Person1.prototype;

// Add new method
Student.prototype.introduce = function() {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
};
const mike = new Student('Mike', 2001, 'Computer Science');
console.log(mike);
mike.introduce();

console.log(mike.__proto__); //Student's prototype
console.log(mike.__proto__.__proto__); //Person1's prototype
console.log(mike.__proto__ === Student.prototype); //true
console.log(mike instanceof Student); //true
console.log(mike instanceof Person1); //true

mike.calcAge(); //Student calling Person1's method

// Because we have used Object.create() so Student's constructor is Person1 (instead of the class Student itself)
console.dir(Student.prototype.constructor); //class Person1

// To fix this:
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor); //class Student

/* Lec215. Inheritance Between "Classes": ES6 Classes */
console.log('----------Lec215----------');
class PersonClass2 {
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }
    calcAge() {
        console.log(`${this.fullName}'s age is: ${2020 - this.birthYear}`);
    }

    // Getter
    get age() {
        return 2020 - this.birthYear;
    }

    // Setter
    set fullName(name) {
        if (name.includes(' ')) this._fullName = name;
        //_fullName != fullName
        else console.log(`${name} is not a full name!`);
    }

    get fullName() {
        return this._fullName;
    }
}
// *Create class Student as a sub-class of class Person
class StudentClass2 extends PersonClass2 {
    constructor(fullName, birthYear, course) {
        //'super' function: calling the constructor of the parent class
        // create 'this' keyword in this sub-class, so we must call this function first
        super(fullName, birthYear);

        this.course = course;
    }

    // Add methods
    introduce() {
        console.log(`My name is ${this.fullName} and I study ${this.course}`);
    }

    // Overwrite parent class's method
    get age() {
        return new Date().getFullYear() - this.birthYear;
    }
}
// *If there are no new properties in the child class:
// class StudentClass2 extends PersonClass2 {} //just this

const bob = new StudentClass2('Michael Bob', 1998, 'Mathematics');
console.log(bob);

bob.calcAge(); //call parent class's method
bob.introduce(); //call child class's method
console.log(bob.age);

/* Lec216. Inheritance Between "Classes": Object.create */
console.log('----------Lec216----------');
// Create a prototype
const PersonProto1 = {
    // Initialize values (just like a constructor)
    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
    calcAge() {
        return new Date().getFullYear() - this.birthYear;
    },
};
// const marie = Object.create(PersonProto1);

// *Create a prototype inherits from PersonProto1
const StudentProto1 = Object.create(PersonProto1); //PersonProto1 object is StudentProto1's prototype
// *Create init() function (reuse from parent prototype PersonProto1)
StudentProto1.init = function(firstName, birthYear, course) {
    PersonProto1.init.call(this, firstName, birthYear);
    this.course = course;
};
// Add methods
StudentProto1.introduce = function() {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
};
const jane = Object.create(StudentProto1); //StudentProto1 object is jane's prototype
jane.init('Jane', 1995, 'Literature');
jane.introduce();
console.log(jane.calcAge()); //call method of parent class (Person)
console.log(jane);

// ==> PersonProto1 object is jane's parent prototype

// Prototype chain
//  _________________________
// | 		Prototype		|
// | 	 [PersonProto1]		|
// |________________________|
// 				^
// 				| .__proto__
//  _________________________
// |		Prototype		|
// |	 [StudentProto1]	| ---> StudentProto1 inherits from PersonProto1
// | __proto__:PersonProto1 |
// |________________________|
// 				^
// 				|
//  ___________________________
// |		  Object		  |
// |		  [jane]		  | ---> jane inherits from StudentProto1
// | __proto__: StudentProto1 |
// |__________________________|

/* Lec217. Another Class Example */
console.log('----------Lec217----------');
// Example from the Bankist app
class Account {
    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this.pin = pin;
        this.movements = []; //set default value is empty array for all objects
        this.locale = navigator.language; //set default value for all objects
        console.log(`Thanks for opeing an account, ${this.owner}`);
    }

    // Add methods (API - Public Interface)
    deposit(val) {
        this.movements.push(val);
    }
    withdraw(val) {
        this.deposit(-val); //calling other method inside a method
    }

    approveLoan(val) {
        return val > 0;
    }
    requestLoan(val) {
        if (this.approveLoan(val)) {
            this.deposit(val);
            console.log('Loan approved');
        }
    }
}
const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);
console.log(acc1.movements);

// *Push elements to movements array
// acc1.movements.push(100);
// acc1.movements.push(-50);
// NOTE: It's a bad idea to do this way ---> Should create a method instead!
acc1.deposit(100);
acc1.withdraw(50); //instead of add -50, the minus sign "-" is "abstracted" away
console.log(acc1.movements);

// *Some 'dangerous' properties are accessible from outside (ex: pin) --> Use encapsulation and data privacy (see in next lectures)
console.log(acc1.pin);
acc1.requestLoan(1000);
acc1.approveLoan(1000);

/* Lec218. Encapsulation: Protected Properties and Methods */
console.log('----------Lec217----------');
// Encapsulation & data privacy: keeping some properties and methods private inside the class so that they're not accessible from outside
//// ---> Prevent outside code from accidentally change the data inside the class
//// ---> Changing internal private methods doesn't affect external code

// NOTE: This lecture, we are using 'fake' encapsulation (just a convention that many people use, not truly private, so we call it 'protected')

class Account1 {
    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;

        // Add '_' --> Protected properties
        this._pin = pin;
        this._movements = [];
        // We know that all properties starting with '_' is not supposed to be touched from outside
        // But we still can access it. However, we know that its wrong to access this property

        this.locale = navigator.language;
        console.log(`Thanks for opeing an account, ${this.owner}`);
    }

    // Public interface
    getMovements() {
        return this._movements;
    }
    deposit(val) {
        this._movements.push(val);
    }
    withdraw(val) {
        this.deposit(-val);
    }
    requestLoan(val) {
        if (this._approveLoan(val)) {
            this.deposit(val);
            console.log('Loan approved');
        }
    }

    // Protected method
    _approveLoan(val) {
        return val > 0;
    }
}
const acc2 = new Account1('Kathy', 'EUR', 2222);
console.log(acc2);
acc2.deposit(100);
acc2.withdraw(50);
acc2.requestLoan(150);

// Because the 'movements' property is protected, so we should NOT access it like this:
// console.log(acc2._movements); //not safe to access directly

// We should call a public interface (API) instead:
console.log(acc2.getMovements()); //can only read and cannot overwrite

/* Lec219. Encapsulation: Private Class Fields and Methods */
console.log('----------Lec219----------');
// Implementing 'true' encapsulation (not like Lec218)
// "Class fields": 8 types (but this lecture focuses on 4 types)
//// 1. Public fields: public properties/instance fields (all instances will have, and not included in prototype)
//// 2. Private fields: private properties/instance fields
//// 3. Public methods: inaccessible from outside
//// 4. Private methods: inaccessible from outside
/// (5. Static methods: not available on instance, only on the class itself)

class Account2 {
    // *Define public fields (included in every instance, and not in its prototype)
    /// Make 'locale' public fields, every instance will have a locale is based on the browser's language
    locale = navigator.language;

    // *Define private fields (included in every instance, and not in its prototype)
    /// Make 'movements' and 'pin' private fields that is inaccessible from outside
    // #movements = []; error, but teacher doesnt have 😕
    #movements = []; //add '#'
    #pin;

    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;

        // Add '_' --> Protected properties
        // this._pin = pin;
        this.#pin = pin;
        // this._movements = [];
        // this.locale = navigator.language;
        console.log(`Thanks for opeing an account, ${this.owner}`);
    }

    // *Define public methods
    getMovements() {
        return this.#movements;
    }
    deposit(val) {
        this.#movements.push(val);
    }
    withdraw(val) {
        this.deposit(-val);
    }
    requestLoan(val) {
        if (this.#approveLoan(val)) {
            this.deposit(val);
            console.log('Loan approved');
        }
    }

    // *Define protected method
    // _approveLoan(val) {
    // 	return val > 0;
    // }

    // *Define private methods
    #approveLoan(val) {
        return val > 0;
    }

    // (Remind) *Define static methods
    static helper() {
        console.log('Helper');
    }
}
const acc3 = new Account2('Kathy', 'EUR', 2222);
acc3.deposit(100);
acc3.withdraw(50);
acc3.requestLoan(150);
console.log(acc3);

// Access private fields and methods
console.log(acc3.movements); //undefined
// console.log(acc3.#movements); //error
console.log(acc3.pin); //undefined
// console.log(acc3.#pin); //error
// console.log(acc3.approveLoan(100)); //undefined function
// console.log(acc3.#approveLoan(100)); //error

// Access static methods of class
Account2.helper();

/* Lec220. Chaining Methods */
console.log('----------Lec220----------');
// Return the object in functions to call in chain
class Account3 {
    locale = navigator.language;
    #movements = [];
    #pin;

    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this.#pin = pin;
        console.log(`Thanks for opeing an account, ${this.owner}`);
    }

    // *Define public methods
    getMovements() {
        return this.#movements;
    }
    deposit(val) {
        this.#movements.push(val);
        return this; //return the object
    }
    withdraw(val) {
        this.deposit(-val);
        return this; //return the object
    }
    requestLoan(val) {
        if (this.#approveLoan(val)) {
            this.deposit(val);
            console.log('Loan approved');
            return this; //return the object
        }
    }
    #approveLoan(val) {
        return val > 0;
    }
    static helper() {
        console.log('Helper');
    }
}
const acc4 = new Account3('Kathy', 'EUR', 2222);
acc4.deposit(100)
    .withdraw(50)
    .requestLoan(150); //chaining
console.log(acc4);
console.log(acc4.getMovements());

/* Lec221. ES6 Classes Summary */
console.log('----------Lec221----------');

// *'extends': create inheritance between classes, automatically sets prototype
class StudentClass3 extends PersonClass2 {
    university = 'University of Science'; //public field (similar to property, available on every instance, same value for all instances)
    #studyHours = 0; //private field (not accessible outside the class, same value for all instances)
    #course; //private field (not accessible outside the class, value is customized in the constructor)
    static numSubjects = 10; //static fields (only available on the class itself, not on instances)

    // Constructor method. Can be omitted in a child class if it has no new properties from parent class (same number of properties, and with same name)
    constructor(fullName, birthYear, startYear, course) {
        //'super' function: calling the constructor of the parent class
        // create 'this' keyword in this sub-class, so we must call this function first before we access the 'this' keyword
        super(fullName, birthYear);

        this.startYear = startYear; //instance property (available on created instance, value can be customized based on input data of the constructor)

        this.#course = course; //private field
    }

    // Public methods
    introduce() {
        console.log(`My name is ${this.fullName} and I study ${this.course}`);
    }

    study(h) {
        this.#makeCoffee(); // access private method
        this.#studyHours += h; // access private field
    }

    // Private method
    #makeCoffee() {
        return 'Here is a coffee for you';
    }

    // Getter --> get a value out
    get testScore() {
        return this.testScore;
    }

    // Setter --> Set a value
    set testScore(score) {
        this.testScore = score <= 20 ? score : 0;
    }

    // NOTE: If we want to set a property that has the same name with a defined property in the constructor, we should create new property by adding '_' in front of the property name
    set birthYear(year) {
        this._birthYear = year;
    }
    get birthYear() {
        return this._birthYear;
    }

    // Static methods: available only on class. Static methods can only access static properties/methods, cannot access instance properties/methods
    static printCurriculus() {
        console.log(`There are ${this.numSubjects} subjects`);
    }
}
const student = new StudentClass3('Jonas', 1990, 2016, 'Medicine');
console.log(student);
