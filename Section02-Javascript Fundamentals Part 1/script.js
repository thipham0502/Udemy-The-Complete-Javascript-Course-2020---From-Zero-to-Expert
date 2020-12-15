/* Lec13. let, const, var */
/* let, const: ES6 (modern Js), var: old way of defining variables*/
/* let: block-scoped, var: function-scoped */
//let: used to declare variables that will be changed later, or declare empty values
let age = 22;
age = 23;

let firstName;
firstName = 'John';

//const: used to declare variables that will NOT be changed later
const birthYear = 1998;
//birthYear = 2002; // get TypeError!!!

//const job; // cannot be empty!!!

birthMonth = 2;
console.log(birthMonth);
console.log("You shouldn't declare variables without using let/const/var like this!");

/* Lec15. Operator Precedence: mức độ ưu tiên toán tử */
// https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table
