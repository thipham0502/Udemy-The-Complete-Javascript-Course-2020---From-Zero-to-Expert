/* Lec32. Activating Strict Mode to write secure Js code */
'use strict'; // should be put at the top

// Strict mode forbids us to do certain things, creates visible errors in the console
let hasDriverLicense = false;
const passTest = true;

//if (passTest) hasDrivingLicense = true; //wrong variable name ==> display error in console
//if (hasDriverLicense) console.log('Yes');

/* Lec33. Functions */
function bookShelf(math, literature) {
	console.log(`Bookshelf with ${math} math books, ${literature} literature books.`);
	return math + literature;
}
var totalBooks = bookShelf(5, 2);
console.log('Total books:', totalBooks);

/* Lec34. Function Declarations vs. Expressions */
// Function declaration
const age1 = calcAge1(1998); //declaration can be called before creating the function
function calcAge1(birthYear) {
	return 2020 - birthYear;
}
//const age1 = calcAge1(1998);
console.log('Age 1 =', age1);

// Function expression (store a function in a variable, function is just a value like stirng, number, etc.)
//const age2 = calcAge2(1998); //error! expression cannot be called before the function
const calcAge2 = function(birthYear) {
	return 2020 - birthYear;
};
const age2 = calcAge2(1998); //must be called after creating the function
console.log('Age 2 =', age2);

/* Lec35. Arrow Functions */
const calcAge3 = (birthYear) => 2020 - birthYear;
const age3 = calcAge3(1998);
console.log('Age 3 =', age3);

const yearUnilRetirement = (birthYear, myName) => {
	const age = 2020 - birthYear;
	const retirement = 65 - age;
	return `${myName} retires in ${retirement} years.`;
};
console.log(yearUnilRetirement(1964, 'T'));

/* Lec36. Functions calling other functions */
function cutFruitPieces(fruit) {
	return fruit * 4;
}
function fruitProcessor(apples, oranges) {
	const applePieces = cutFruitPieces(apples);
	const orangePieces = cutFruitPieces(oranges);

	console.log(`Juice with ${applePieces} apple pieces, ${orangePieces} orange pieces.`);
	return applePieces + orangePieces;
}
console.log('Total number of pieces =', fruitProcessor(2, 3));

/* Lec39. Introduction to arrays */
const friends = [ 'Michael', 'Steven', 'Peter' ];
console.log(friends);

const years = new Array(1964, 1964, 1998, 2002);
console.log(years);
console.log(years[years.length - 1]);

// store multi data types
years[1] = 'abc';
years[2] = [ 1, 2, 3 ];
years[3] = calcAge1(years[3]);
console.log(years); // [1964, "abc", [1, 2, 3], 18]

/* Lec40. Basic Array Operations (Methods) */
// push: add new element to the END of the array & return length of the new array
const arr1 = [ 'a', 'b', 'c', 'd' ];
const newLength = arr1.push('e'); //5
console.log(`newLength = ${newLength}`);
console.log(arr1); //["a", "b", "c", "d", "e"]

// unshift: add new element to the BEGINNING of the array & return length of the new array
console.log(arr1.unshift('z')); //6
console.log(arr1); //["z", "a", "b", "c", "d", "e"]

// pop: remove the LAST element of the array & return the removed element (opposite of push)
console.log(arr1.pop()); //"e"
console.log(arr1); //["z", "a", "b", "c", "d"]

// shift: remove the FIRST element of the array & return the removed element (opposite of unshift)
console.log(arr1.shift()); //"z"
console.log(arr1); //["a", "b", "c", "d"]

// indexof: return te index of the value (just the first position found)
console.log(arr1.indexOf('b')); //1
console.log(arr1.indexOf('m')); //-1

// includes: check if a value exists in the array
console.log(arr1.includes('b'));
console.log(arr1.includes('m'));

/* Lec42. Introduction to Objects */
const myInfo = {
	firstName: 'Kathy',
	lastName: 'Pham',
	birthYear: 1998,
	job: 'Dev',
	favColors: [ 'red', 'black', 'white' ],

	calcAge: function() {
		this.age = 2020 - this.birthYear;
		return this.age;
	},
	getSummary: function() {
		return `My name is ${this.firstName} ${this.lastName}, I'm a ${this.calcAge()} ${this.job} 
        and my favorite colors are ${this.favColors}.`;
	}
};
console.log(myInfo);

/* Lec43. Dot vs. Bracket Notation */
console.log(myInfo.firstName);
console.log(myInfo['age']);
// const info = prompt('What do you want to know about me (choose between firstName, lastName, birthYear, job, favColors:');

// if (myInfo[info]) console.log(`This is my ${info}: ${myInfo[info]}`);
// else console.log(`Wrong option! Choose between firstName, lastName, age, job, favColors`);

myInfo['height'] = 160;
myInfo.address = 'HCMC';
console.log(myInfo);
console.log(`My name is ${myInfo.firstName} and I like ${myInfo.favColors.length} colors 
and ${myInfo.favColors[0]} is the color I like the most`);

console.log(myInfo.calcAge()); // must call the function first to create the 'age' property
console.log(myInfo.age);
console.log(myInfo.getSummary());

/* Lec44. 'For' loop */
for (let rep = 1; rep <= 10; rep++) {
	console.log(`Loop ${rep} times ...`);
}

/* Lec45. Looping Arrays, Breaking and Continuing */
const arr2 = [ 1, '2', [ 3, 4, 5 ], true ];
const types = [];
for (let i = 0; i < arr2.length; i++) {
	if (typeof arr2[i] !== 'string') continue;
	console.log(arr2[i], typeof arr2[i]);
	types.push(typeof arr2[i]);
}
console.log(types);
