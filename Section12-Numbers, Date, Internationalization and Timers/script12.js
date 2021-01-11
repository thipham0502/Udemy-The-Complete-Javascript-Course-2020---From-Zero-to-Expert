'use strict';

/* Lec166. Converting and Checking Numbers */
console.log('----------Lec166----------');

// Js just has 'number' type for integers, floats, ... Use 64bits to represent numbers: 53bits to store digits, the rest to store decimal point and sign (negative '-')
console.log(23 === 23.0); //true

// Javascript represent numbers in binary base (0, 1), not Base 10 (0-9)
console.log(0.1 + 0.2); //0.30000000000000004 - Weird huh?
console.log(0.1 + 0.2 === 0.3); //FALSE!!!
// NOTE: This is an error in Javascript that we have to accept 🙄

// Convert string to number
console.log(Number('100'));
console.log(+'100'); //automatically convert all string after '+' to numbers (coercion)

// Number.parseInt(<string>, <base (ex: 10-decimal, 2-binary, ...)>)
console.log('---Number.parseInt()---');
console.log(Number.parseInt('   25px ', 10)); //25 --> automatically find the number if it stands before any characters, even there are spaces
console.log(Number.parseInt('e10', 10)); //NaN --> not work because stirng must begin with a number
console.log(Number.parseInt('1000', 2)); //8-dec = 1000-bin

// Number.parseFloat(<string>, <base (ex: 10-decimal, 2-binary, ...)>)
console.log('---Number.parseFloat()---');
console.log(Number.parseFloat('2.5rem', 10)); //2.5 --> automatically find the number if it stands before any characters
console.log(Number.parseInt('2.5rem', 10)); //2: just return Int

// Also works if we remove 'Number.' like this, because parseInt/parseFloat are global functions:
console.log(parseInt('25px', 10)); //but this is old-school, not encouraged in modern Js

// Number.isNaN(): Check NaN
console.log('---Number.isNaN()---');
console.log(Number.isNaN(20)); //false
console.log(Number.isNaN(+'20cm')); //true, because '20cm' cannot be converted to number

// Number.isFinite(): Check Infinity
console.log('---Number.isFinite()---');
console.log(15 / 0); //Divide by 0 --> Infinity
console.log(Number.isFinite(15)); //true
console.log(Number.isFinite(+'20')); //Number --> true
console.log(Number.isFinite(15 / 0)); //Infinity --> false
console.log(Number.isFinite('a')); //String --> false
console.log(Number.isFinite(+'20')); //Number --> true
console.log(Number.isFinite(+'20a')); //NaN --> false
// NOTE: Number.isFinite() is the best way to check if a value is a number

// Number.isInteger(): Check if a value is an integer
console.log('---Number.isInteger()---');
console.log(Number.isInteger(15)); //true
console.log(Number.isInteger(15.0)); //true
console.log(Number.isInteger(15.2)); //float --> false
console.log(Number.isInteger(15 / 0)); //Infinity --> false

/* Lec167. Math and Rounding */
console.log('----------Lec167----------');

// Math.sqrt(): square root
console.log('---Math.sqrt()---');
console.log(Math.sqrt(25)); //5
console.log(25 ** (1 / 2)); //5

// Math.max(): Find max value in a sequence of numbers
console.log('---Math.max()---');
console.log(Math.max(1, 0, 8, 6)); //8
console.log(Math.max(1, 0, '8', 6)); //8: also perform coercion (auto convert string to number)
console.log(Math.max(1, 0, '8px', 6)); //NaN: not work for strings contain letters

// Math.min(): Find min value in a sequence of numbers
console.log('---Math.min()---');
console.log(Math.min(1, 0, 8, 6)); //0
console.log(Math.min(1, '0', '8', 6)); //0: also perform coercion (auto convert string to number)
console.log(Math.min(1, '0px', '8px', 6)); //NaN: not work for strings contain letters

// Math.PI = 3.1415...
console.log('---Math.PI()---');
console.log(Math.PI); //3.1415...

// Math.random()
console.log('---Math.random()---');
console.log(Math.random()); //random a float value from 0-1

// Math.trunc(): rounding (remove decimal part)
console.log('---Math.trunc()---');
console.log(Math.trunc(5.234)); //5

// Math.round(): rounding to the NEAREST integers
console.log('---Math.round()---');
console.log(Math.round(5.234)); //5
console.log(Math.round(5.834)); //6
console.log(Math.round('5.834')); //6, with type coercion

// Math.ceil(): rounding UP
console.log('---Math.ceil()---');
console.log(Math.ceil(5.234)); //6
console.log(Math.ceil(5.834)); //6
console.log(Math.ceil('5.834')); //6, with type coercion

// Math.floor(): rounding DOWN
console.log('---Math.floor()---');
console.log(Math.floor(5.234)); //5
console.log(Math.floor(5.834)); //5
console.log(Math.floor('5.834')); //5, with type coercion

// Compare Math.trunc() and Math.floor()
console.log('---Compare Math.trunc() and Math.floor()---');
console.log(Math.trunc(5.298), Math.floor(5.298)); //same results for positive numbers
console.log(Math.trunc(-5.298), Math.floor(-5.298)); //-5 -6
// NOTE: Math.floor() is better than Math.trunc() because it can deal with positive and negative numbers

// Practice: Random a value between min and max
console.log('---randomInt()---');
const randomInt = (min, max) => Math.trunc(Math.random() * (max - min) + 1) + min;
// We have: 0 < Math.random() < 1
// ==>      0 < Math.random() * (max - min) < max - min
// ==>      1 < Math.random() * (max - min) + 1 = newVal < max - min + 1
// ==>      1 + min < floor(newVal) < max - min + 1 + min
// ==>      min + 1 < newVal < max + 1
// ==>      min <= newVal <= max
console.log(randomInt(7, 10));

// (X.Y).toFixed(): Rounding number X.Y to a specific decimal characters --> returns a string
console.log((5.2).toFixed(0)); //5: rounding DOWN because 5.2 < 5.5, no decimals
console.log((5.8).toFixed(0)); //6: rounding UP because 5.8 > 5.5, no decimals
console.log((5.2).toFixed(3)); //5.200: add upto 3 decimals
console.log((5.2115111).toFixed(5)); //5.21151: round upto 5 decimals
console.log((5.2115171).toFixed(5)); //5.21152: round upto 5 decimals
console.log(+(5.2).toFixed(5)); //round upto 5 decimals ('5.20000'), and convert to number (5.2)
console.log(+(5.2115171).toFixed(5)); //5.21152: round upto 5 decimals and convert to number

/* Lec168. The Remainder Operator */
console.log('----------Lec168----------');
console.log(5 % 2); //1: Chia lấy phần dư
console.log(5 / 2); //2.5: Chia bình thường

// Check odd/even
const checkEven = (x) => (x % 2 === 0 ? 'even' : 'odd');
console.log(checkEven(104)); //even
console.log(checkEven(103)); //odd

/* Lec169. Working with BigInt */
console.log('----------Lec169----------');
// BigInt: a special primitive type of Integers introduced in 2020
// While for numbers, Js uses 64bits to represent: 53bits to store digits, the rest to store decimal point and sign (negative '-')
// ---> 53bits is a limit space for big numbers
// Largest number Js can SAFELY represent: = 2^53 - 1 (minus 1 because it starts at 0)

console.log(2 ** 53 - 1); //9007199254740991
console.log(Number.MAX_SAFE_INTEGER); //9007199254740991

// Larger number will not be represented accurately in most cases
console.log(2 ** 53 + 0); //9007199254740992: correct (Js use some tricks here 🙄)
console.log(2 ** 53 + 1); //9007199254740992: not correct
console.log(2 ** 53 + 2); //9007199254740994: not correct

// BigInt can store integers with any size (as large as we want)
console.log(13325394645765857536253525); //1.3325394645765857e+25
// console.log(13325394645765857536253525n); //not work for me :(, just like the optional chaining (?.) and the nullish operator (??)

console.log(BigInt(123456789)); //123456789n: correct for converting small numbers to BigInt type
console.log(BigInt(13325394645765857536253525)); //13325394645765856721633280n: not correct for large numbers --> must pass a string instead
console.log(BigInt('13325394645765857536253525')); //13325394645765857536253525n: Correct

console.log('---typeof---');
console.log(typeof BigInt(1000)); //bigint

// Operations with BigInt (can just use basic operations like +,-,*,/)
console.log('---Operations---');
console.log(BigInt(20000) + BigInt(1000)); //21000n
console.log(BigInt(20000) - BigInt(1000)); //21000n
console.log(BigInt('13325394645765857536253525') * BigInt(1000)); //13325394645765857536253525000n
console.log(BigInt('13325394645765857536253525') / BigInt(1000)); //13325394645765857536253n: returns the closest BigInt
console.log(BigInt(10) / BigInt(3)); //3n: returns the closest BigInt (no decimals)

// NOTE: Cannot mix operations between BigInt and regular numbers
// console.log(BigInt('13325394645765857536253525') * 1000); //TypeError: Cannot mix BigInt and other types

// NOTE: Cannot use Math functions on BigInt
// console.log(Math.sqrt(BigInt(16))); //TypeError: Cannot convert a BigInt value to a number

// But we can compare between BigInt and regular numbers
console.log('---Comparations---');
console.log(BigInt(20000) > 2000); //true
console.log(BigInt(20000) === 2000); //false
console.log(BigInt(20000) == 20000); //true

// Concatenate a BigInt with a string
console.log('---Concatenation---');
console.log(BigInt(12345678910111213141516171819202122232425) + ' is my bigint'); //12345678910111212685957161983373568114688 is my bigint

/* Lec170. Creating Dates */
console.log('----------Lec170----------');

// Create a date
console.log('_______________Create a date_______________');
//// Method #1: use constructor new Date()
const now = new Date(); //get current date
console.log(now);

//// Method #2: Parse from a date string
console.log(new Date('Feb 05 2021 12:00:00'));
console.log(new Date('December 05, 2021 12:00:00'));
console.log(new Date('12/08/2021 12:00:00'));
console.log(new Date('2020-08-13T10:51:36.790Z')); //Z: UTC
console.log(new Date(2020, 10, 5, 20, 0, 0)); //month starts with 0 (0: Jan --> 11: Dec)

console.log(new Date(0)); //add 0 milliseconds to Unix time (01/01/1970 07:00:00 GMT+700)
console.log(new Date(3600000 * 24 * 2)); //add 2 days to Unix time (03/01/1970 07:00:00 GMT+700)
// NOTE: 3600000 * 24 * 2 = 172800000 is the timestamp of date 03/01/1970 07:00:00 GMT+700

// Working with dates
console.log('_______________Working with dates_______________');
const future = new Date(2026, 1, 2, 20, 10, 50);
console.log(future); //2026
console.log(future.getFullYear()); //Mon Feb 02 2026 20:00:00 GMT+0700 (Indochina Time)
console.log(future.getMonth()); //1 (month starts with 0 (0: Jan --> 11: Dec))
console.log(future.getDate()); //2: get day of the month
console.log(future.getDay()); //get day of the week (0: Sun --> 6: Sat)
console.log(future.getHours()); //20
console.log(future.getMinutes()); //10
console.log(future.getSeconds()); //50
console.log(future.toISOString()); //'2026-02-02T13:10:50.000': International format string
console.log(future.getTime()); //timestamp of the date (the number of milliseconds added to Unix time i.e. 01/01/1970 07:00:00 GMT+700)
console.log(new Date(1770037850000)); //create date from timestamp
// --> We can convert timestamp to date and vice versa

console.log(Date.now()); //get current timestamp

future.setFullYear(2035); //change the year
future.setMonth(3); //change the month
future.setDate(11); //change the day of the month
// future.setDay(0); //no function to change the day of the week (because day of the week is auto-generated based on the day of the month)
future.setHours(15); //change the hour
future.setMinutes(30); //change the hour
future.setSeconds(28); //change the hour
console.log(future);
