'use strict';

/* Challenge #1:
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:
1. Julia found out that the owners of the first and the last two dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

Test data:
o Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
o Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

*/

const checkDogs = function(juliaDogs, kateDogs) {
	// 1. Remove the first and the last two dogs
	const juliaCorrect = juliaDogs.slice(1, -2);
	console.log(juliaCorrect);

	/* Method 2: 
    const juliaCorrect = juliaDogs.slice();
    juliaCorrect.splice(0, 1);
    juliaCorrect.splice(-2);
    console.log(juliaCorrect);*/

	// 2.
	const allDogs = juliaCorrect.concat(kateDogs);
	console.log(allDogs);

	// 3.
	allDogs.forEach(function(age, i) {
		console.log(
			age >= 3
				? `Dog number ${i + 1} is an adult, and is ${age} years old`
				: `Dog number ${i + 1} is still a puppy 🐶`
		);
	});
};
checkDogs([ 3, 5, 2, 12, 7 ], [ 4, 1, 15, 8, 3 ]);
checkDogs([ 9, 16, 6, 8, 3 ], [ 10, 5, 6, 1, 4 ]);

/* Challenge #2:
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4

2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)

3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)

4. Run the function for both test datasets

Test data:
o Data 1: [5, 2, 4, 1, 15, 8, 3]
o Data 2: [16, 6, 10, 5, 6, 1, 4]
*/
const calcAverageHumanAge = function(ages) {
	// 1.
	// const humanAgesMap = ages.map(function(dogAge) {
	// 	return dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4;
	// });
	const humanAges = ages.map((dogAge) => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4));
	console.log(humanAges);

	//2.
	// const humanAgesFilter = humanAges.filter(function(dogAge) {
	// 	return dogAge >= 18;
	// });
	const adults = humanAges.filter((dogAge) => dogAge >= 18);
	console.log(adults);

	//3.
	// const sum = adults.reduce((acc, dogAge) => acc + dogAge, 0),
	// 	avg = sum / adults.length;
	const avg = adults.reduce((acc, dogAge, i, arr) => acc + dogAge / arr.length, 0);
	console.log(avg);
};
calcAverageHumanAge([ 5, 2, 4, 1, 15, 8, 3 ]);
calcAverageHumanAge([ 16, 6, 10, 5, 6, 1, 4 ]);
