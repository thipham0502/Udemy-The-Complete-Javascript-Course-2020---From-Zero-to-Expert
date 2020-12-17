'use strict';

const c = (b, a) => 200 * b + a;
console.log(c(10, 4));

/* Create/Open Snippet (code shortcuts): File -> Preferences -> User Snippets */
// Test 'KathySnippet': write 'cl' and hit 'Enter' instead of 'console.log'
console.log(c(5, 14));

/* TODO highlight: highlight a custom text (edit color in file settings.json) */
// Test highlighted text:
/* Lec55. Setting up Prettier and VS Code */
/* Challenge #1 ... */

/* Lec56. Installing Node.js and setting up a dev environment */
/* Installing Nodejs */
// https://nodejs.org/en/download/ => Windows installer => Run the setup
// Add path 'C:\Program Files\nodejs' to environment variables to run node cmd
// Test node cmd in terminal: node -v

/* Installing Live-server via node */
// npm install live-server -g

/* Setting up to use Ctrl + K to clear the terminal */
// https://stackoverflow.com/questions/48713604/how-can-i-clear-the-terminal-in-visual-studio-code
// File -> Preferences -> Keyboard Shortcuts -> Search for 'workbench.action.terminal.clear'
// Double click on it and hold CTRL and tap 'K' -> Enter
// Right click on it -> 'Change when expression' -> Type 'terminalFocus' -> Enter

/* Run live server in terminal */
// Use cmd: 'live-server' -> Open index.html (default) in the browser

/* Lec59. Using Google, StackOverflow, MDN */
// MDN: https://developer.mozilla.org/en-US/docs/Web/Reference

// PROBLEM 1:
// We work for a company building a smart home thermometer. Our most recent task is this:
// "Given an array of temperatures of one day, calculate the temperature amplitude.
// Keep in mind that sometimes there might be a sensor error."

// 1) Understanding the problem
// - What is temp amplitude? Answer: difference between highest and lowest temp
// - How to compute max and min temperatures?
// - What's a sensor error? And what to do?

// 2) Breaking up into sub-problems
// - How to ignore errors?
// - Find max value in temp array
// - Find min value in temp array
// - Subtract min from max (amplitude) and return it

const temperatures = [ 3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5, [ 'abc', 1 ] ];

const calcAmplitude = function(temps) {
	let max = temps[0],
		min = temps[0];

	for (let i = 0; i < temps.length; i++) {
		let curTemp = temps[i];
		// Ignore sensor error
		if (typeof curTemp === 'number') {
			if (max < curTemp) max = curTemp;
			if (min > curTemp) min = curTemp;
		} else console.log(`Ignore value with type ${typeof curTemp}`);
	}
	const amplitude = max - min;
	console.log(`Max = ${max}\nMin = ${min}\nAmplitude = ${amplitude}`);
	return amplitude;
};
console.log(calcAmplitude(temperatures));

// PROBLEM 2:
// Function should now receive 2 arrays of temps

// 1) Understanding the problem
// - With 2 arrays, should we implement functionality twice? NO! Just merge two arrays

// 2) Breaking up into sub-problems
// - Merge 2 arrays
const calcAmplitude2 = function(temps1, temps2) {
	const temps = temps1.concat(temps2);
	let max = temps[0],
		min = temps[0];

	for (let i = 0; i < temps.length; i++) {
		let curTemp = temps[i];
		// Ignore sensor error
		if (typeof curTemp === 'number') {
			if (max < curTemp) max = curTemp;
			if (min > curTemp) min = curTemp;
		} else console.log(`Ignore value with type ${typeof curTemp}`);
	}
	const amplitude = max - min;
	console.log(`Max = ${max}\nMin = ${min}\nAmplitude = ${amplitude}`);
	return amplitude;
};
console.log(calcAmplitude2([ 30, 27, 16, 'error' ], [ 19, 'error', 26, 23 ]));

/* Lec60. Debugging */
// 'Sources' tab -> 'script5.js' -> Set break point -> Run -> Step (F9) to run the next line
// View variables' value in 'Scope' panel on the right
const measureKelvin = function() {
	const measurement = {
		type: 'temp',
		unit: 'celsius',
		value: Number(prompt('Degrees celsius:'))
	};
	//console.log(measurement);
	console.table(measurement); // print objects as a table
	//console.warn(measurement.value); // print a warning
	//console.error(measurement.value); // print an error

	debugger; // set break point
	const kelvin = measurement.value + 273;
	return kelvin;
};
console.log(measureKelvin());
