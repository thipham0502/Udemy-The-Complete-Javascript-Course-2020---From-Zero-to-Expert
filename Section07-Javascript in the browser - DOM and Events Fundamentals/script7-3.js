'use strict';

/* Lec82. PROJECT #3: PIG GAME */
// Roll the dice, if dice = 1 -> loose all the score and switch to the other player
// Choose to hold the score and switch to the other player
// (read the flowchart photo)

// Select element by ID
const score0_Elem = document.querySelector('#score--0');
const score1_Elem = document.getElementById('score--1');

const current0_Elem = document.getElementById('current--0');
const current1_Elem = document.getElementById('current--1');

const player0_Elem = document.querySelector('.player--0');
const player1_Elem = document.querySelector('.player--1');

const dice_Elem = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHolđ = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, isPlaying;

// Initializing the game when: Starting the program or Game ended
const init = function() {
	/* If we declare these variables here, they are only available inside this function
    and therefore cannot be accessed outside
    
    let scores = [ 0, 0 ]; //total (final) scores of both players
	let currentScore = 0;
	let activePlayer = 0; //which player is playing
	let isPlaying = true; //the game is playing or finished
    */

	scores = [ 0, 0 ];
	currentScore = 0;
	activePlayer = 0;
	isPlaying = true;

	score0_Elem.textContent = 0;
	score1_Elem.textContent = 0;
	current0_Elem.textContent = 0;
	current1_Elem.textContent = 0;

	dice_Elem.classList.add('hidden'); //hide the dice

	player0_Elem.classList.remove('player--winner');
	player1_Elem.classList.remove('player--winner');
	player0_Elem.classList.add('player--active');
	player1_Elem.classList.remove('player--active');
};

init();

// Switching player when: Click hold or Dice = 1
const switchPlayer = function() {
	// Reset current score
	currentScore = 0;
	document.getElementById(`current--${activePlayer}`).textContent = currentScore;

	// Switch to next player
	activePlayer = activePlayer === 0 ? 1 : 0;

	// toggle: removing class if it's present and adding class if it's not present
	player0_Elem.classList.toggle('player--active');
	player1_Elem.classList.toggle('player--active');
};

// Roll the dice
btnRoll.addEventListener('click', function() {
	if (isPlaying) {
		// 1. Generating a random dice roll

		// Math.random(): random float values from (0,1)
		// -> Math.random()*6: float values from (0,6) -> Math.trunc(Math.random()*6): int values from (0,6) = [0,1,2,3,4,5]
		// -> Math.trunc(Math.random() * 6) + 1: int values [1,2,3,4,5,6] = Dice value
		const dice = Math.trunc(Math.random() * 6) + 1;
		console.log(`You have rolled a ${dice}`);

		// 2. Display dice img
		dice_Elem.classList.remove('hidden');
		dice_Elem.src = `dice-${dice}.png`;

		//3. Check for rolled 1: if true, switch to next player, else, add dice to current score
		if (dice !== 1) {
			currentScore += dice; //increase the current score
			document.getElementById(`current--${activePlayer}`).textContent = currentScore; //display the current score
		} else {
			switchPlayer();
		}
	}
});

// Add the current score to the total score and switch player
btnHolđ.addEventListener('click', function() {
	if (isPlaying) {
		//1. Add current score to active player's score
		scores[activePlayer] += currentScore;
		document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
		console.log(scores[activePlayer]);

		//2. Check if player's score is >= 100 -> finish the game
		if (scores[activePlayer] >= 20) {
			isPlaying = false; //end the game
			dice_Elem.classList.add('hidden'); //hide the dice

			// Display winner (change class -> change CSS)
			document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
			document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
		} else {
		}

		//3. Switch to the next player
		switchPlayer();
	}
});

// Reset the game
btnNew.addEventListener('click', init); //dont write init()!!!
