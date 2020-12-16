/* Lec13. let, const, var */
/* let, const: ES6 (modern Js), var: old way of defining variables */
/* let: block-scoped, var: function-scoped */
// let: used to declare variables that will be changed later, or declare empty values
let age = 22;
age = 23;

let firstName;
firstName = 'John';

// const: used to declare variables that will NOT be changed later
const birthYear = 1998;
//birthYear = 2002; // get TypeError!!!

//const job; // cannot be empty!!!

birthMonth = 2;
console.log(birthMonth);
console.log("You shouldn't declare variables without using let/const/var like this!");

/* Lec15. Operator Precedence: mức độ ưu tiên toán tử */
// https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table

/* Lec17. Strings and Template Literals */
const lastName = 'Michael';
const job = 'Teacher';
const currentYear = 2020;
const myBirthYear = 1991;

// Print this pattern: "I'm <lastName>, a (<currentYear> - <myBirthYear>) <job>!"
const myIntroduction = `I'm ${firstName} ${lastName}, a ${currentYear - myBirthYear} years old ${job.toLowerCase()}!`;
console.log('My introduction using string literal:', myIntroduction);

//Multiline string
console.log('This is\na multi\nline\nstring with \\n!');
console.log('This is\n\
a multi\n\
line\n\
string with \\n\\!');
console.log(`This is
a multi
line
string with backtick!`);

/* Lec18. If/else */
// Adding emoji: Window + '.'
console.log(`Some icon: 🎶💕✨`);

/* Lec20. Type conversion and Coercion */
// Conversion: manually convert
// Coercion: Js automatically and implicitly convert

/* string -> number */
const strInputYear = '1998';
console.log(strInputYear, typeof strInputYear);

const numInputYear = Number(strInputYear);
console.log(numInputYear, typeof Number(numInputYear));

const _str = 'abc';
console.log(Number(_str)); //NaN
console.log('typeof NaN:', typeof NaN); //number, because NotANumber is an invalid number

/* number to string */
console.log('typeof String(10):', typeof String(10));

/* Coercion */
// '+' operator: string concat
// other operator: convert the variable to number type to calculate
console.log('I am ' + 22 + ' years old');
console.log('30' - '20' + 5); //15
console.log('30' + '20' + 5); //30205 (string concat)
console.log('30' + '20' - 5); //3020 (string concat) - 5 = 3015
console.log('30' * '5'); //150
console.log('30' / 5); //6
console.log('30' > '10'); //true
console.log('30' > 10); //true

let n = '1' + 2; //12 (string concat)
console.log(typeof n); //string
n = n - 1; //11
console.log(typeof n); //number
n = n + 1; //12
console.log(n); //12

const a = 10 + 5 + '3'; // -> (10+5) + '3" = 15 + '3' = 153 (string concat)
console.log(a); //153

/* Lec21. Truthy & Falsy values */
// 5 falsy values: 0, '', undefined, null, NaN
// All others are truthy values
console.log(Boolean(0)); //false
console.log(Boolean('')); //false
console.log(Boolean(undefined)); //false
console.log(Boolean(null)); //false
console.log(Boolean(NaN)); //false

console.log(Boolean(100)); //true
console.log(Boolean('abc')); //true
console.log(Boolean({})); //true {} is an empty object

const money = 0;
if (!money) console.log('No money');
else console.log('You have money!');

/* Lec22. Equality operators: == vs. === */
// ==: loosely equal (type coercion, same value)
// ===: strictly equal (same type, same value)
console.log(18 === 18); //true
console.log(18 === '18'); //false
console.log(18 == '18'); //true

// Input prompt
// const str_year = prompt('Input your birth year:'); //enter string
// const num_year = Number(prompt('Input your birth year:')); //convert enter string to number
// document.getElementById('text1').innerHTML = `Your age is ${2020 - num_year}`;
// console.log('str_year:', typeof str_year, str_year);
// console.log('num_year:', typeof num_year, num_year);

// != vs !==
// !=: loosely unequal (type coercion any type, not same value)
// !==: strictly unequal (not same type, not same value)
console.log('\n');
console.log(18 !== 20); //true
console.log(18 !== 18); //false
console.log(18 !== '18'); //true
console.log(18 != 20); //true
console.log(18 != '20'); //true
console.log(18 != '18'); //false

/* Lec24. Logical operators */
const isMale = true;
const isAdult = false;
if (isMale && isAdult) console.log('Man');
else if (isMale && !isAdult) console.log('Boy');
else if (!isMale && isAdult) console.log('Woman');
else if (!isMale && !isAdult) console.log('Girl');
else console.log('Characteristic undefined!');

/* Lec26. Switch statement */
const day = 3;
switch (day) {
	case 2:
	case 3:
	case 4:
	case 5:
	case 6:
		console.log('Weekday');
		break;
	case 7:
	case 8:
		console.log('Weekend');
		break;
	default:
		console.log('Not valid!');
	//break;
}

/* Lec28. Conditional (Ternary) Operator */
const myAge = 18;
let adult = myAge >= 18 ? true : false;
console.log(adult);
console.log(`You are ${myAge >= 18 ? 'an' : 'not an'} adult.`);
