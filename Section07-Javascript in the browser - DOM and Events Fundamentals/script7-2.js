'use strict';

/* Lec79. PROJECT #2: MODAL WINDOW */
/* Lec80. Working with classes */
/* Lec81. Handling 'Esc' Keypress event */

// Select element by class
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnClose = document.querySelector('.close-modal');
//const btnOpenModal = document.querySelector('.show-modal'); //just take the 1st element found
const btnsOpenModal = document.querySelectorAll('.show-modal'); //just take all elements found
console.log(btnsOpenModal);

// Functions to open/close a modal
const openModal = function() {
	// Display the modal & overlay (class = 'modal hidden' -> class = 'modal')
	modal.classList.remove('hidden');
	overlay.classList.remove('hidden');
};

const closeModal = function() {
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
};

// Loops for all buttons
for (let i = 0; i < btnsOpenModal.length; i++) {
	console.log(btnsOpenModal[i]);
	btnsOpenModal[i].addEventListener('click', openModal);
}

// 'X' button to close the modal
btnClose.addEventListener('click', closeModal);

// Close modal by clicking out the overlay
overlay.addEventListener('click', closeModal);

// keyup: is fired when we lift our finger off the key
// keypress: is fired continuously as we keep our finger on a key
// keydown: is fired when we press down a key
document.addEventListener('keydown', function(event) {
	//console.log(event);
	// console.log(event.key);
	console.log(`You have pressed '${event.key}': '${event.code}'!`);

	// Press Esc to close the modal if it's not hidden
	if (event.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});
