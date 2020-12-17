'use strict';

/* Lec70. PROJECT #1 */
// Take out the text content
console.log(document.querySelector('.message').textContent);
console.log(document.querySelector('.label-score').textContent);

/* What is DOM? */
// DOM = Document Object Model: structured representation of HTML documents. Allows Javascript to access HTML
// elements and styles to use them (change text, HTML attributes, CSS styles by using Js)

/* Lec72. Selecting and manipulating elements */
// Assign new text content
// HTML text field except input -> .textContent
//document.querySelector('.message').textContent = '🎉 Correct Number!';
console.log(document.querySelector('.message').textContent);

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

// HTML input field -> .value
document.querySelector('.guess').value = 23; // set value of input field
console.log(document.querySelector('.guess').value);

/* Lec73. Handling Click Events */
const secretNumber = Math.trunc(Math.random() * 20) + 1; //random numbers between 1 & 20

document.querySelector('.number').textContent = secretNumber;

// <button class="btn check">
document.querySelector('.check').addEventListener('click', function() {
	const guess = Number(document.querySelector('.guess').value);
	console.log(guess, typeof guess);

	let message;

	if (guess) {
		message = '✅ ' + guess + ' entered!';
		console.log(message);
		document.querySelector('.message').textContent = message;
	} else if (guess === secretNumber) {
		document.querySelector('.message').textContent = '🎉 Correct Number!';
	} else {
		message = '⛔ Enter a number!';
		console.log(message);
		document.querySelector('.message').textContent = message;
	}
});
