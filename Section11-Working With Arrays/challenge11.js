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

console.log('----------Challenge #1----------');
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

console.log('----------Challenge #2----------');
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

/* Challenge #3:
Rewrite the 'calcAverageHumanAge' function from challenge #2, but this time as an arrow function, and using chaining!

Test data:
o Data 1: [5, 2, 4, 1, 15, 8, 3]
o Data 2: [16, 6, 10, 5, 6, 1, 4]
*/

console.log('----------Challenge #3----------');
const calcAverageHumanAge2 = function(ages) {
	const result = ages
		.map((dogAge) => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4)) //calc dogHumanAge
		.filter((dogHumanAge) => dogHumanAge >= 18) //filter dogHumanAge >= 18
		.reduce((acc, dogAdultAge, i, arr) => acc + dogAdultAge / arr.length, 0); //avg = sum(age/n)
	// avg = sum(age)/n === sum(age/n)
	// NOTE: must calculate using formula 'sum(age/n)', can't calculate sum(age)/n because n is unknown (we cannot take out the length of filter's result)
	console.log(result);
};
calcAverageHumanAge2([ 5, 2, 4, 1, 15, 8, 3 ]);
calcAverageHumanAge2([ 16, 6, 10, 5, 6, 1, 4 ]);

/* Challenge #4:
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little. Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite. Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint)

1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do not create a new array, simply loop over the array. Formula: recommendedFood = weight ** 0.75 * 28. (The result is in grams of
food, and the weight needs to be in kg)

2. Find Sarah's dog and log to the console whether it's eating too much or too little. Hint: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓

3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').

4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

5. Log to the console whether there is any dog eating exactly the amount of food that is recommended (just true or false)

6. Log to the console whether there is any dog eating an okay amount of food (just true or false)

7. Create an array containing the dogs that are eating an okay amount of food (try to reuse the condition used in 6.)

8. Create a shallow copy of the 'dogs' array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects 😉)

Hint:  Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.
*/

console.log('----------Challenge #4----------');

const dogs = [
	{ weight: 22, curFood: 250, owners: [ 'Alice', 'Bob' ] },
	{ weight: 8, curFood: 200, owners: [ 'Matilda' ] },
	{ weight: 13, curFood: 275, owners: [ 'Sarah', 'John' ] },
	{ weight: 32, curFood: 340, owners: [ 'Michael' ] }
];

// 1.
console.log('---Question 1---');
dogs.map((dog) => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

// 2.
console.log('---Question 2---');
// Checking Sarah's dog
const sarahDog = dogs.find((dog) => dog.owners.includes('Sarah'));
console.log(`Sarah's dog is eating too ${sarahDog.curFood > sarahDog.recommendedFood ? 'much' : 'little'}`);

// 3.
console.log('---Question 3---');
// Array of owners of dogs who eat too much
const ownersEatTooMuch = dogs.filter((dog) => dog.curFood > dog.recommendedFood).flatMap((dog) => dog.owners);
console.log(ownersEatTooMuch);

// Array of owners of dogs who eat too little
const ownersEatTooLittle = dogs.filter((dog) => dog.curFood <= dog.recommendedFood).flatMap((dog) => dog.owners);
console.log(ownersEatTooLittle);

// 4.
console.log('---Question 4---');
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much`);

console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little`);

// 5.
console.log('---Question 5---');
console.log(dogs.some((dog) => dog.curFood === dog.recommendedFood));

// 6.
const checkOkayAmount = function(dog) {
	return dog.curFood > dog.recommendedFood * 0.9 && dog.curFood < dog.recommendedFood * 1.1;
};

console.log('---Question 6---');
console.log(dogs.some((dog) => checkOkayAmount(dog)));

// 7.
console.log('---Question 7---');
console.log(dogs.filter((dog) => checkOkayAmount(dog)));

// 8.
console.log('---Question 8---');
let dogs_sorted = dogs.slice(); //a shallow copy of 'dogs'
console.log(dogs);
dogs_sorted.sort(
	(curr, next) =>
		// Ascending recommendedFood
		curr.recommendedFood - next.recommendedFood
);
console.log(dogs_sorted);
