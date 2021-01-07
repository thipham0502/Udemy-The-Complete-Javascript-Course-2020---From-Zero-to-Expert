'use script';

/* Lec143. BANKIST APP (See Bankist-flowchart.png) */
// Demo at: https://bankist.netlify.app/

//////// DATA \\\\\\\\
const account1 = {
	owner: 'Jonas Schmedtmann',
	movements: [ 200, 450, -400, 3000, -650, -130, 70, 1300 ],
	interestRate: 1.2, // %
	pin: 1111
};

const account2 = {
	owner: 'Jessica Davis',
	movements: [ 5000, 3400, -150, -790, -3210, -1000, 8500, -30 ],
	interestRate: 1.5,
	pin: 2222
};

const account3 = {
	owner: 'Steven Thomas Williams',
	movements: [ 200, -200, 340, -300, -20, 50, 400, -460 ],
	interestRate: 0.7,
	pin: 3333
};

const account4 = {
	owner: 'Sarah Smith',
	movements: [ 430, 1000, 700, 50, 90 ],
	interestRate: 1,
	pin: 4444
};

const accounts = [ account1, account2, account3, account4 ];

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
const displayMovements = function(movementsArr) {
	// Empty the container (element with class="movements" ('containerMovements' variable))
	containerMovements.innerHTML = '';
	//// NOTE: textContent: return the text itself  ;   innerHTML: return everything (all HTML tags)

	movementsArr.forEach(function(mov, i) {
		const type = mov > 0 ? 'deposit' : 'withdrawal';

		// Create the html element by using ``
		// <div class="movements__row">
		//     <div class="movements__type movements__type--deposit">2 deposit</div>
		//     <div class="movements__date">3 days ago</div> // not now
		//     <div class="movements__value">4 000€</div>
		// </div>
		const html = `
            <div class="movements__row">
                <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
                <div class="movements__value">${mov}</div>
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
displayMovements(account1.movements);

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
const calcDisplayBalance = function(movements) {
	const balance = movements.reduce((acc, mov) => acc + mov, 0);

	// Display in labelBalance element
	labelBalance.textContent = `${balance}€`;
};
calcDisplayBalance(account1.movements);
