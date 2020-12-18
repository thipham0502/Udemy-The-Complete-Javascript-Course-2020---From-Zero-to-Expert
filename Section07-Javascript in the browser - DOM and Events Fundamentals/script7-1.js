'use strict';

/* Lec70. PROJECT #1: GUESS MY NUMBER GAME */
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
//document.querySelector('.number').textContent = 13;
console.log(document.querySelector('.message').textContent);

// HTML input field -> .value
document.querySelector('.guess').value = ''; // set value of input field
console.log(document.querySelector('.guess').value);

/* Lec73. Handling Click Events */
/* Lec75. Manipulating CSS Styles */
let secretNumber = Math.trunc(Math.random() * 20) + 1; //random numbers between 1 & 20

let score = 20; //wrong guess: minus 1 score
document.querySelector('.score').textContent = 20;

let highscore = 0; //highest score gained
let message;

const displayMessage = function(message) {
	console.log(message);
	document.querySelector('.message').textContent = message;
};

// <button class="btn check">
document.querySelector('.check').addEventListener('click', function() {
	const guess = Number(document.querySelector('.guess').value);
	console.log(guess);

	// No input
	if (!guess) {
		displayMessage('🙄 Enter a number!');
	} else if (guess === secretNumber) {
		// Correct guess
		displayMessage('🎉 Correct Number!');

		// Display the secret number
		document.querySelector('.number').textContent = secretNumber;

		// Update highscore
		if (highscore < score) {
			highscore = score;
			document.querySelector('.highscore').textContent = highscore;
			console.log('New highscore = ', highscore);
		}

		// Change CSS: background & width of secret number box
		document.querySelector('body').style.backgroundColor = '#60b347';
		document.querySelector('.number').style.width = '30rem';
	} else if (guess !== secretNumber) {
		if (score > 1) {
			displayMessage(guess < secretNumber ? '📉 Too low!' : '📈 Too high!');

			score--;
			document.querySelector('.score').textContent = score;
		} else {
			score--;
			document.querySelector('.score').textContent = score;

			displayMessage('💥 You lost the game!');
		}
	}
});

/* Challenge #1: 
Implement a game rest functionality, so that the player can make a new guess! (Reset the game)
(continue script7.js)

1. Select the element with the 'again' class and attach a click event handler
2. In the handler function, restore initial values of the 'score' and
'secretNumber' variables
3. Restore the initial conditions of the message, number, score and guess input
fields
4. Also restore the original background color (#222) and number width (15rem)
*/

document.querySelector('.again').addEventListener('click', function() {
	// Reset guess number
	document.querySelector('.guess').value = '';

	// Reset score
	score = 20;
	document.querySelector('.score').textContent = score;

	// Reset secret number
	secretNumber = Math.trunc(Math.random() * 20) + 1; //random numbers between 1 & 20
	document.querySelector('.number').textContent = '?';

	// Reset message
	displayMessage('Start guessing...');

	// Reset CSS: background & width of secret number box
	document.querySelector('body').style.backgroundColor = '#222';
	document.querySelector('.number').style.width = '15rem';
});
