'use strict';

// const { clearInterval } = require('timers');

//const { setInterval } = require('timers');

/* Lec143. BANKIST APP (See Bankist-flowchart.png) */
// Demo at: https://bankist.netlify.app/

//////// DATA \\\\\\\\
let account1 = {
	owner: 'Jonas Schmedtmann',
	movements: [ 200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300 ],
	movementsSorted: [], //storing movements after sorted
	interestRate: 1.2, // %
	pin: 1111,
	movementsDates: [
		'2019-11-18T21:31:17.178Z',
		'2019-12-23T07:42:02.383Z',
		'2020-01-28T09:15:04.904Z',
		'2020-04-01T10:17:24.185Z',
		'2021-01-08T14:11:59.604Z',
		'2021-01-09T17:01:17.194Z',
		'2021-01-10T23:36:17.929Z',
		'2021-01-11T10:51:36.790Z'
	],
	movementsDatesSorted: [], //storing movement dates after sorted
	currency: 'EUR',
	locale: 'pt-PT' // de-DE
};

let account2 = {
	owner: 'Jessica Davis',
	movements: [ 5000, 3400, -150, -790, -3210, -1000, 8500, -30 ],
	movementsSorted: [], //storing movements after sorted
	interestRate: 1.5,
	pin: 2222,
	movementsDates: [
		'2019-11-01T13:15:33.035Z',
		'2019-11-30T09:48:16.867Z',
		'2019-12-25T06:04:23.907Z',
		'2020-01-25T14:18:46.235Z',
		'2020-02-05T16:33:06.386Z',
		'2020-04-10T14:43:26.374Z',
		'2020-06-25T18:49:59.371Z',
		'2020-07-26T12:01:20.894Z'
	],
	movementsDatesSorted: [], //storing movement dates after sorted
	currency: 'USD',
	locale: 'en-US'
};

let account3 = {
	owner: 'Steven Thomas Williams',
	movements: [ 200, -200, 340, -300, -20, 50, 400, -460 ],
	movementsSorted: [], //storing movements after sorted
	interestRate: 0.7,
	pin: 3333,
	movementsDates: [
		'2019-12-01T13:15:33.035Z',
		'2019-11-30T09:48:16.867Z',
		'2019-12-15T06:04:23.907Z',
		'2020-01-11T03:28:46.235Z',
		'2020-03-05T16:23:06.386Z',
		'2020-04-10T14:43:26.374Z',
		'2020-06-25T15:49:59.371Z',
		'2020-07-06T12:01:20.894Z'
	],
	movementsDatesSorted: [], //storing movement dates after sorted
	currency: 'VND',
	locale: 'vi-VN'
};

let account4 = {
	owner: 'Sarah Smith',
	movements: [ 430, 1000, 700, 50, 90 ],
	movementsSorted: [], //storing movements after sorted
	interestRate: 1,
	pin: 4444,
	movementsDates: [
		'2019-12-01T13:15:33.035Z',
		'2019-11-30T09:48:16.867Z',
		'2019-12-15T06:04:23.907Z',
		'2020-01-11T03:28:46.235Z',
		'2020-03-05T16:23:06.386Z',
		'2020-04-10T14:43:26.374Z',
		'2020-06-25T15:49:59.371Z',
		'2020-07-06T12:01:20.894Z'
	],
	movementsDatesSorted: [], //storing movement dates after sorted
	currency: 'USD',
	locale: 'en-GB'
};

let accounts = [ account1, account2, account3, account4 ]; //array of objects

//////// ELEMENTS \\\\\\\\
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/* Lec144. BANKIST APP (cont.): Creating DOM Elements */
// Create new row (element with class="movements__row" for each account's movement
// with 'sort' parameter
const displayMovements = function(account, sort = false) {
	// Empty the container (element with class="movements" ('containerMovements' variable))
	containerMovements.innerHTML = '';
	//// NOTE: textContent: return the text itself  ;   innerHTML: return everything (all HTML tags)

	/* Lec160. Sorting Arrays */
	// ----------Lec160----------
	// If sort === false -> dont sort; Else if sort === true -> do the sort
	// Use slice() to create a copy of movements (don't implement directly on 'movements'
	// const newMovements = sort ? account.movements.slice().sort((a, b) => a - b) : account.movements;

	/* Add to teacher's code */
	// Sort the movements, and match with the date of that movement
	let combinedArray = []; //array combining movements and dates (ex: [movement: 200, date: '2020-07-26T12:01:20.894Z'])
	let newMovements;
	let NewDates;
	if (sort) {
		for (let j = 0; j < currentAccount.movements.length; j++) {
			combinedArray.push({
				movement: currentAccount.movements[j],
				date: currentAccount.movementsDates[j]
			});
		}

		combinedArray.sort((a, b) => a.movement - b.movement); //sort by movement values

		// Add new array: movementsSorted and movementsDateSorted to the account object
		for (let k = 0; k < combinedArray.length; k++) {
			currentAccount.movementsSorted[k] = combinedArray[k].movement;
			currentAccount.movementsDatesSorted[k] = combinedArray[k].date;
		}
		newMovements = currentAccount.movementsSorted;
		NewDates = currentAccount.movementsDatesSorted;
	} else {
		newMovements = currentAccount.movements;
		NewDates = currentAccount.movementsDates;
	}
	// -------------------- \\\

	newMovements.forEach(function(mov, i) {
		const type = mov > 0 ? 'deposit' : 'withdrawal';

		// Create the html element by using ``
		// <div class="movements__row">
		//     <div class="movements__type movements__type--deposit">2 deposit</div>
		//     <div class="movements__date">3 days ago</div> // not now
		//     <div class="movements__value">4 000€</div>
		// </div>

		/* Lec167. Math and Rounding */
		//----------Lec167----------
		// Rounding movements to a 2 decimal characters --> .toFixed(2)
		const amount = Math.floor(inputLoanAmount.value);
		// --------------------

		/* Lec171. Adding Dates */
		// ----------Lec171----------
		const date = new Date(NewDates[i]); //get the date of the movement based on index

		const displayDate = formatMovementDate(date, account.locale);

		/* Lec174. Internationalization API (Intl) - Numbers */
		// ----------Lec174---------- \\
		const formattedMov = formatCurrency(mov, account.locale, account.currency);
		// -------------------------- \\

		const html = `
            <div class="movements__row">
				<div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
				<div class="movements__date">${displayDate}</div>
                <div class="movements__value">${formattedMov}</div>
            </div>`;

		// Add 'html' to element with class="movements" ('containerMovements' variable)
		//// .insertAdjacentHTML(<position to add>, <element>)
		// <!-- beforebegin -->: before <element>
		// <p> <-- p is <element> in this case
		//     <!-- afterbegin -->: inside <element>, before its 1st child
		//     foo
		//     <!-- beforeend -->: inside <element>, after its last child
		// </p>
		// <!-- afterend -->: after <element>
		containerMovements.insertAdjacentHTML('afterbegin', html);
	});
};
// displayMovements(account1.movements);

function formatMovementDate(date, locale) {
	/* Lec171. Adding Dates */
	// ----------Lec171----------

	/* Lec172. Operations with Dates */
	// ----------Lec172---------- \\
	// Calculate difference between 2 days in days (round value to the nearest integers)
	const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
	const daysPassed = calcDaysPassed(new Date(), date); //Calculate difference between current day and movement' date
	console.log(`daysPassed = ${daysPassed}`);

	// If date is yesterday --> display "Yesterday"
	// If date is a few days ago --> display "x days ago"
	if (daysPassed === 0) return 'Today';
	if (daysPassed === 1) return 'Yesterday';
	if (daysPassed <= 7) return `${daysPassed} days ago`;

	// //return the format date
	// const day = date.getDate();
	// const month = date.getMonth() + 1; // + 1 because month starts with 0: Jan
	// const year = date.getFullYear();

	// //// If day or month or hour or minute is 1 digit --> pad a zero at the start to make it 2 digits
	// //// --> padStart(<length>, <character>)
	// const dayPadding = day.toString().padStart(2, 0);
	// const monthPadding = month.toString().padStart(2, 0);
	// return `${dayPadding}/${monthPadding}/${year}`;

	/* Lec173. Internationalization API (Intl) */
	// ----------Lec173---------- \\
	return new Intl.DateTimeFormat(locale).format(date); //dont add options because we just want to display the simplest date
}

/* Lec174. Internationalization API (Intl) - Numbers */
// ----------Lec174---------- \\
// Use Intl() API to format money for a locale
function formatCurrency(value, locale, currency) {
	const options = {
		style: 'currency',
		currency: currency
	};
	return new Intl.NumberFormat(locale, options).format(value);
}

/* Lec148. Computing Usernames */
console.log('----------Lec148----------');

const user = 'Steven Thomas Williams'; //username = 'stw'
// Method 1:
let createUserNames = function(user) {
	let username = '';
	user.toLowerCase().split(' ').forEach(function(word) {
		username += word[0];
	});
	return username;
};
console.log(createUserNames(user));

// Method 2:
createUserNames = function(user) {
	const username = user
		.toLowerCase()
		.split(' ')
		.map(function(word) {
			return word[0];
		})
		.join('');
	return username;
};
console.log(createUserNames(user));

// Method 3: Use arrow function for short:
createUserNames = function(user) {
	const username = user.toLowerCase().split(' ').map((word) => word[0]).join('');
	return username;
};
console.log(createUserNames(user));

// Create username property for each account object
createUserNames = function(accounts) {
	accounts.forEach(function(acc) {
		acc.username = acc.owner.toLowerCase().split(' ').map((word) => word[0]).join('');
	});
};
createUserNames(accounts);
console.log(accounts);

/* Lec150. The reduce method */
console.log('----------Lec150----------');
// Calculate the current balance (current money in the account)
const calcDisplayBalance = function(account) {
	account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);

	// Display in labelBalance element
	/* Lec167. Math and Rounding */
	//----------Lec167----------
	// Rounding balance to a 2 decimal characters --> .toFixed(2)
	// labelBalance.textContent = `${account.balance}€`;
	// labelBalance.textContent = `${account.balance.toFixed(2)}€`;

	/* Lec174. Internationalization API (Intl) - Numbers */
	// ----------Lec174---------- \\
	labelBalance.textContent = formatCurrency(account.balance, account.locale, account.currency);
};
// calcDisplayBalance(account1.movements);

/* Lec152. The Chain Methods */
console.log('----------Lec152----------');
const calcDisplaySummary = function(account) {
	// Income: sum of all deposits
	// Outcome: sum of all withdrawals
	// Interest: money that the bank will pay
	console.log('___Incomes___');
	const incomes = account.movements.filter((mov) => mov > 0).reduce((acc, mov) => {
		console.log(`${acc} + ${mov} = ${acc + mov}`);
		return acc + mov;
	}, 0);

	/* Lec167. Math and Rounding */
	//----------Lec167----------
	// Rounding incomes to a 2 decimal characters --> .toFixed(2)
	// labelSumIn.textContent = `${incomes.toFixed(2)}€`; //html element displaying incomes

	/* Lec174. Internationalization API (Intl) - Numbers */
	// ----------Lec174---------- \\
	labelSumIn.textContent = formatCurrency(incomes, account.locale, account.currency);
	// -------------------------- \\

	console.log('___Outcomes___');
	const outcomes = account.movements.filter((mov) => mov < 0).reduce((acc, mov) => {
		console.log(`${acc} + ${mov} = ${acc + mov}`);
		return acc + mov;
	}, 0);

	/* Lec167. Math and Rounding */
	//----------Lec167----------
	// Rounding outcomes to a 2 decimal characters --> .toFixed(2)
	// labelSumOut.textContent = `${Math.abs(outcomes).toFixed(2)}€`; //html element displaying outcomes

	/* Lec174. Internationalization API (Intl) - Numbers */
	// ----------Lec174---------- \\
	labelSumOut.textContent = formatCurrency(Math.abs(outcomes), account.locale, account.currency);
	// -------------------------- \\

	console.log('___Interests___'); //Interests on deposits, interest = 1.2 * deposit, only if interest >= 1€
	const interest = account.movements
		.filter((mov) => mov > 0) //filter deposit (movement > 0)
		.map((deposit) => deposit * account.interestRate / 100) //calc interest = deposit * rate%
		.filter((interest, i, arr) => {
			console.log(arr);
			return interest >= 1;
		}) //filter interest >= 1€
		.reduce((acc, interest) => acc + interest, 0);

	/* Lec167. Math and Rounding */
	//----------Lec167----------
	// Rounding interest to a 2 decimal characters --> .toFixed(2)
	// labelSumInterest.textContent = `${interest.toFixed(2)}€`; //html element displaying interests

	/* Lec174. Internationalization API (Intl) - Numbers */
	// ----------Lec174---------- \\
	labelSumInterest.textContent = formatCurrency(interest, account.locale, account.currency);
	// -------------------------- \\

	console.log(incomes, outcomes, interest);
	// let income, outcome, interest;
};
// calcDisplaySummary(account1);

const updateUI = function(account) {
	// Display data
	displayMovements(account);
	calcDisplayBalance(account);
	calcDisplaySummary(account);
};
/* Lec154. The find Method */
console.log('----------Lec154----------');
console.log(accounts); //array of objects
const account = accounts.find((acc) => acc.owner === 'Jessica Davis');
console.log(account); //return an object

// same as (using for loop):
let result;
for (const acc of accounts) {
	if (acc.owner === 'Jessica Davis') {
		result = acc;
		break;
	}
}
console.log(result);

/* Lec155. Login */
console.log('----------Lec155----------');

let currentAccount; //global variable for the login user

/* Lec176. Implement a countdown timer */
// ----------Lec176----------
let timer; //global variable for the timer clock

//// FAKE ALWAYS LOGGED IN \\\\
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

/* Lec176. Implement a countdown timer */
// ----------Lec176----------
// Log out users after some inactive time: after 5mins without doing anything
const startLogOutTimer = function() {
	let seconds = 5 * 60; // 5 minutes = 300 seconds to logout if there are no activities
	const tick = function() {
		let min = String(Math.trunc(seconds / 60)).padStart(2, 0);
		let sec = String(seconds % 60).padStart(2, 0); //if < 10 -> padding a '0' to the start to make 2 digits (ex: 1 --> 01)
		// In each call, print the remaining time
		labelTimer.textContent = `${min}:${sec}`;

		// After second 0, stop timer and log out user
		//// Stop timer
		if (seconds < 0) {
			clearInterval(timer); //timer variable is at (*)
			//// Logout
			labelWelcome.textContent = 'Log in to get started';
			containerApp.style.opacity = 0;
		}

		// Decrease 1s
		seconds--;
	};

	// Call and update the timer every second
	tick(); //must execute the function immediate before the timer starts
	const timer = setInterval(tick, 1000); //(*)

	// return the timer to stop it later in the btnLogin function
	return timer;
};
// -------------------------- \\

btnLogin.addEventListener('click', function(event) {
	//NOTE: By default, clicking a Submit button in a form will reload page => Need to be prevented
	//NOTE: Fill the form and press 'Enter' will automatically activate 'click' event of the button
	event.preventDefault();

	// Check username and PIN for login
	currentAccount = accounts.find(
		(acc) => acc.username === inputLoginUsername.value && acc.pin === Number(inputLoginPin.value)
	); //get user matches with the input username and PIN // use .value to get content of tag <input>
	// If exists user with input username and PIN --> display the 'app' element (CSS style opacity = 100) & welcome label
	if (currentAccount) {
		containerApp.style.opacity = 100;
		labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}!`; //get owner's 1st name

		/* Lec171. Adding Dates
		// ----------Lec171----------
		// Add current date: day/month/year
		const now = new Date();
		const day = now.getDate();
		const month = now.getMonth() + 1; // + 1 because month starts with 0: Jan
		const year = now.getFullYear();
		const hour = now.getHours();
		const minute = now.getMinutes();

		//// If day or month or hour or minute is 1 digit --> pad a zero at the start to make it 2 digits (MUST CONVERT TO STRING BEFORE PADDING!)
		//// --> padStart(<length>, <character>)
		const dayPadding = day.toString().padStart(2, 0);
		const monthPadding = month.toString().padStart(2, 0);
		const hourPadding = hour.toString().padStart(2, 0);
		const minutePadding = minute.toString().padStart(2, 0);
		//// or:
		// const day = `${now.getDate()}`.padStart(2, 0);
		//// or:
		// const day = String(now.getDate()).padStart(2, 0);

		labelDate.textContent = `${dayPadding}/${monthPadding}/${year}, ${hourPadding}:${minutePadding}`;
		// --------------------------------- \\  */

		/* Lec173. Internationalization API (Intl) */
		// ----------Lec173---------- \\
		// Use Intl() API to format date for a locale: Intl.DateTimeFormat(<locale string>, <customized format options>).format(<date variable>)

		// Options to customize format string
		const options = {
			// weekday: 'long', //Monday, Tuesday, ...
			weekday: 'short', //Mon, Tue, ...
			// weekday: 'narrow', //M, T, W, T, ...

			day: 'numeric',

			// month: 'numeric', //1, 2, 3, 4, ...
			// month: '2-digit', //01, 02, 03, 04, ...
			// month: 'long', //January, February, ...
			month: 'short', //Jan, Feb, ...

			year: 'numeric', //2020, 2021, ...
			// year: '2-digit', //20, 21, ...

			hour: 'numeric',
			minute: 'numeric'
		};
		// Get locale string based on account
		const locale = currentAccount.locale;
		console.log(`My locale: ${locale}`);

		// Display the current date on labelDate
		const now = new Date();
		labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now); //Tue, Jan 12, 2021, 12:07 PM
		// --------------------------------- \\

		// Clear input fields
		inputLoginUsername.value = inputLoginPin.value = '';
		inputLoginUsername.blur(); //prevent cursor from focusing on the textbox after "Enter"
		inputLoginPin.blur(); //prevent cursor from focusing on the textbox after "Enter"

		/* Lec176. Implement a countdown timer */
		// ----------Lec176----------
		// Check if the timer is working then stops it and restart a new one
		if (timer) clearInterval(timer);
		timer = startLogOutTimer(); //5 minutes = 5*60 minutes until log out
		// timer = startLogOutTimer(5);
		// --------------------------------- \\

		// Display data
		updateUI(currentAccount);
	} else {
		containerApp.style.opacity = 0;
		labelWelcome.textContent = `Wrong username or password!`;
	}
	console.log(inputLoginUsername.value, inputLoginPin.value, currentAccount);
});

/* Lec156. Transfer Feature */
console.log('----------Lec156----------');

btnTransfer.addEventListener('click', function(event) {
	//NOTE: By default, clicking a Submit button in a form will reload page => Need to be prevented
	//NOTE: Fill the form and press 'Enter' will automatically activate 'click' event of the button
	event.preventDefault();

	const amountTransfer = Number(inputTransferAmount.value);

	// Find the username that we want to transfer to
	const receiverAcc = accounts.find((acc) => acc.username === inputTransferTo.value);
	console.log(amountTransfer, receiverAcc);

	// Checking conditions:
	//// amount of transfer > 0
	//// receiver exists
	//// <= remaining balance (must have enough money left in the account)
	//// receiver !== current account (cannot transfer for urself)
	if (
		amountTransfer > 0 &&
		receiverAcc &&
		amountTransfer <= currentAccount.balance &&
		receiverAcc.username !== currentAccount.username
	) {
		console.log('Doing the transfer...');
		currentAccount.movements.push(-amountTransfer); //minus money from the current account
		receiverAcc.movements.push(amountTransfer); //add money to the received account

		/* Lec171. Adding Dates */
		// ----------Lec171----------
		// Add date to transfer movement
		currentAccount.movementsDates.push(new Date().toISOString());
		receiverAcc.movementsDates.push(new Date().toISOString());
		// --------------------------------- \\

		// Display data
		updateUI(currentAccount);

		// Clear input fields
		inputTransferAmount.value = inputTransferTo.value = '';
		inputTransferAmount.blur(); //prevent cursor from focusing on the textbox after "Enter"
		inputTransferTo.blur(); //prevent cursor from focusing on the textbox after "Enter"

		/* Lec176. Implement a countdown timer */
		// ----------Lec176----------
		// Reset the timer
		clearInterval(timer); //stop the current timer
		timer = startLogOutTimer();
	} else {
		console.log('NOT VALID AMOUNT OR RECEIVER!');
	}
});

/* Lec157. findIndex Method */
console.log('----------Lec157----------');
// findIndex(): returns the index of the element found
// indexOf(): returns the index of the element found, but must match the whole element (simple)

//// App's Close Account functionality: Before closing account, the current user must confirm username & PIN --> enter username & PIN --> look for account's index in 'accounts' array --> use 'splice(<index>)' to remove the account object from the array
btnClose.addEventListener('click', function(event) {
	//NOTE: By default, clicking a Submit button in a form will reload page => Need to be prevented
	//NOTE: Fill the form and press 'Enter' will automatically activate 'click' event of the button
	event.preventDefault();

	// Before closing account, the current user must confirm username & PIN
	// Checking if the username & PIN match with the current user
	console.log(inputCloseUsername.value, currentAccount.username, inputClosePin.value, currentAccount.pin);
	if (inputCloseUsername.value === currentAccount.username && inputClosePin.value == currentAccount.pin) {
		// findIndex(): find the index of the account object in 'accounts' array
		// findIndex(<element>, <index>, <array>)
		const i = accounts.findIndex(
			(acc) => acc.username === currentAccount.username && acc.pin === currentAccount.pin
		);
		accounts.splice(i, 1); //delete 1 element at index = i
		console.log(accounts);

		// Clear input fields
		inputCloseUsername.value = inputClosePin.value = '';
		inputCloseUsername.blur(); //prevent cursor from focusing on the textbox after "Enter"
		inputClosePin.blur(); //prevent cursor from focusing on the textbox after "Enter"

		// Hide UI (logout)
		containerApp.style.opacity = 0;
		labelWelcome.textContent = 'Log in to get started';
	} else {
		console.log("Wrong Confirmation Information! Can't close this account!");
	}
});

/* Lec158. some and every */
console.log('----------Lec158----------');
// some(): App's Request Loan functionality
/// The bank only accept a loan if there is at least 1 deposit of the account with at least 10% of the requested loan amount (eg: amount = 10000 => 10%*amount = 1000 => accept the loan amount if there is at least 1 deposit >= 1000 in the account)
btnLoan.addEventListener('click', function(event) {
	//NOTE: By default, clicking a Submit button in a form will reload page => Need to be prevented
	//NOTE: Fill the form and press 'Enter' will automatically activate 'click' event of the button
	event.preventDefault();

	/* Lec167. Math and Rounding */
	console.log('----------Lec167----------');
	// Rounding DOWN loan amount --> use Math.floor()
	const amount = Math.floor(inputLoanAmount.value);
	// --------------------

	if (amount > 0 && currentAccount.movements.some((mov) => mov >= amount * 0.1)) {
		/* Lec175. Timers: setTimeOut and setInterval */
		// ----------Lec175---------- \\
		// Wait for 3 seconds before adding the loan amount to movements (it takes 3 secs to loan successfully)
		console.log('3 seconds left...');
		setTimeout(() => console.log('2 seconds left...'), 1000); //call the function after 1 milliseconds
		setTimeout(() => console.log('1 seconds left...'), 2000); //call the function after 2 milliseconds
		setTimeout(function() {
			// Add movement
			currentAccount.movements.push(amount);

			/* Lec171. Adding Dates */
			// ----------Lec171----------
			// Add date to loan movement
			currentAccount.movementsDates.push(new Date().toISOString());
			// --------------------------------- \\

			// Display data
			updateUI(currentAccount);

			// Clear input fields
			inputLoanAmount.value = '';
			inputLoanAmount.blur(); //prevent cursor from focusing on the textbox after "Enter"

			/* Lec176. Implement a countdown timer */
			// ----------Lec176----------
			// Reset the timer
			clearInterval(timer); //stop the current timer
			timer = startLogOutTimer();
		}, 3000);
		setTimeout(() => console.log('Loan successfully!'), 3000); //call the function after 2 milliseconds
	} else {
		console.log('You cannot request this amount of loan!');
	}
});

/* Lec159. flat and flatMap (ES2019) */
console.log('----------Lec159----------');
// flat():
// Calculate the overal balance of all movements of all accounts
//// accounts = [acc1, acc2, acc3, acc4], acc1 = { ..., movements: [100, -500, 2000], ...}
//// Goal: put all movements array into 1 flat array
const accountMovements = accounts.map((acc) => acc.movements); //get all 'movements' arrays into 1 array: [[mov1], [mov2], ...]
console.log(accountMovements);
const allMovements = accountMovements.flat(); //get all movements into 1 array
console.log(allMovements);
const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0); //add all movements
console.log(overalBalance);

//// Use chaining instead:
const overalBalance1 = accounts.map((acc) => acc.movements).flat().reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance1);

// flatmap(): combines 'flat' and 'map' methods (only flatten 1 level, cannot change the depth)
const overalBalance2 = accounts.flatMap((acc) => acc.movements).reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);

/* Lec160. Sorting Arrays */
console.log('----------Lec160----------');
let sorted = false; //status shows whether the movements array are sorted or not
btnSort.addEventListener('click', function(event) {
	event.preventDefault();
	displayMovements(currentAccount, !sorted); //when sorted === false => call function displayMovements(movements, sort=true) and do the sort
	sorted = !sorted; //update sorted status
});

/* Lec161. More Ways of Creating and Filling Arrays */
console.log('----------Lec161----------');
// querySelectorAll() find all elements with the given class/ID --> returns a NodeList: nearly like an array contains all selected elements

//// Click the balance label --> show sum of all displayed movements
//// First, we must convert NodeList to an array

labelBalance.addEventListener('click', function() {
	// Return value of .querySelectorAll()
	console.log('Return values of .querySelectorAll()');
	console.log(document.querySelectorAll('.movements__value')); //NodeList [div.movements__value, div.movements__value, ...]

	// Convert a NodeList to array
	//// Method 1: use Array.from()
	const movementsUI = Array.from(document.querySelectorAll('.movements__value'), (elem) =>
		Number(elem.textContent.replace('€', ''))
	); //return array of all movements in numbers after removing the Euro sign
	console.log('movementsUI');
	console.log(movementsUI);

	//// Method 2: use spread operator '...'
	const movementsUI2 = [ ...document.querySelectorAll('.movements__value') ].map((elem) =>
		Number(elem.textContent.replace('€', ''))
	);
	console.log('movementsUI2');
	console.log(movementsUI2);

	// Calculate sum of movements in movementsUI
	const sumMovs = movementsUI.reduce((curr, mov) => curr + mov);
	console.log('Sum of all movements:');
	console.log(sumMovs);
});

/* Lec168. The Remainder Operator */
console.log('----------Lec168----------');

// Fun practice: Click the logo --> rows with even index will be yellow
document.querySelector('.logo').addEventListener('click', function() {
	console.log('----------Clicked----------');
	[ ...document.querySelectorAll('.movements__row') ].forEach(function(row, i) {
		if (i % 2 === 0) row.style.backgroundColor = 'yellow';
	});
});

//
