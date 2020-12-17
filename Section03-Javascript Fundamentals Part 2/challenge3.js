/* Challenge #1: 
Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new
gymnastics discipline, which works differently.
Each team competes 3 times, and then the average of the 3 scores is calculated (so
one average score per team).
A team only wins if it has at least double the average score of the other team.
Otherwise, no team wins!

1. Create an arrow function 'calcAverage' to calculate the average of 3 scores
2. Use the function to calculate the average for both teams
3. Create a function 'checkWinner' that takes the average score of each team
as parameters ('avgDolhins' and 'avgKoalas'), and then logs the winner
to the console, together with the victory points, according to the rule above.
Example: "Koalas win (30 vs. 13)"
4. Use the 'checkWinner' function to determine the winner for both Data 1 and
Data 2
5. Ignore draws this time
*/

const calcAvgScore = (score1, score2, score3) => (score1 + score2 + score3) / 3;
const avgDolphins = calcAvgScore(85, 54, 41);
const avgKoalas = calcAvgScore(23, 34, 27);

const checkWinner = function(scoreDolphins, scoreKoalas) {
	if (scoreDolphins >= 2 * scoreKoalas)
		console.log(`Dolphins 🐬 win with score ${scoreDolphins} vs. ${scoreKoalas}!`);
	else if (scoreKoalas >= 2 * scoreDolphins)
		console.log(`Koalas 🐨 win with score ${scoreKoalas} vs. ${scoreDolphins}!`);
	else console.log('No team wins!');
};
checkWinner(avgDolphins, avgKoalas);

/* Challenge #2: 
Steven is still building his tip calculator, using the same rules as before: Tip 15% of
the bill if the bill value is between 50 and 300, and if the value is different, the tip 
is 20%.

1. Write a function 'calcTip' that takes any bill value as an input and returns
the corresponding tip, calculated based on the rules above (you can check out
the code from first tip calculator challenge if you need to). Use the function
type you like the most. Test the function using a bill value of 100

2. And now let's use arrays! So create an array 'bills' containing the test data
125, 555 and 44

3. Create an array 'tips' containing the tip value for each bill, calculated from
the function you created before

4. Bonus: Create an array 'total' containing the total values, so the bill + tip
*/
const calcTip = function(bill) {
	return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
};
const bills = [ 125, 55, 44 ];
const tips = [];
const totals = [];
for (var i = 0; i < bills.length; i++) {
	tips.push(calcTip(bills[i]));
	totals.push(bills[i] + tips[i]);
	console.log(`Bill = $${bills[i]}. Tip = $${tips[i]}. Total = $${totals[i]}`);
}
console.log(bills);
console.log(tips);
console.log(totals);

/* Challenge #3: 
Let's go back to Mark and John comparing their BMIs! This time, let's use objects to
implement the calculations! Remember: BMI = mass / height ** 2 = mass
/ (height * height) (mass in kg and height in meter)

1. For each of them, create an object with properties for their full name, mass, and
height (Mark Miller and John Smith)
2. Create a 'calcBMI' method on each object to calculate the BMI (the same
method on both objects). Store the BMI value to a property, and also return it
from the method
3. Log to the console who has the higher BMI, together with the full name and the
respective BMI. Example: "John's BMI (28.3) is higher than Mark's (23.9)!"
*/
const calcBMI = function(mass, height) {
	return mass / height ** 2;
};

const infoMark = {
	fullName: 'Mark Miller',
	mass: 65,
	height: 1.7,
	calcBMI: function() {
		this.bmi = this.mass / this.height ** 2;
		return this.bmi;
	}
};

const infoJohn = {
	fullName: 'John Smith',
	mass: 68,
	height: 1.75,
	calcBMI: function() {
		this.bmi = this.mass / this.height ** 2;
		return this.bmi;
	}
};

console.log(`Mark's BMI = ${infoMark.calcBMI()}`);
console.log(`John's BMI = ${infoJohn.calcBMI()}`);

if (infoMark.bmi > infoJohn.bmi) console.log(`Mark's BMI (${infoMark.bmi}) is higher than John's (${infoJohn.bmi})`);
else if (infoMark.bmi < infoJohn.bmi)
	console.log(`John's (${infoJohn.bmi}) is higher than Mark's BMI (${infoMark.bmi})`);
else console.log(`John's (${infoJohn.bmi}) is equal to Mark's BMI (${infoMark.bmi})`);

/* Challenge #4: 
Let's improve Steven's tip calculator even more, this time using loops!

1. Create an array 'bills' containing all 10 test bill values: 
22, 295, 176, 440, 37, 105, 10, 1100, 86 and 52
2. Create empty arrays for the tips and the totals ('tips' and 'totals')
3. Use the 'calcTip' function we wrote before (no need to repeat) to calculate
tips and total values (bill + tip) for every bill value in the bills array. Use a for
loop to perform the 10 calculations!
4. Bonus: Write a function 'calcAverage' which takes an array called 'arr' as
an argument. This function calculates the average of all numbers in the given
array. This is a difficult challenge (we haven't done this before)! Here is how to
solve it:
    4.1. First, you will need to add up all values in the array. To do the addition,
start by creating a variable 'sum' that starts at 0. Then loop over the
array using a for loop. In each iteration, add the current value to the
'sum' variable. This way, by the end of the loop, you have all values
added together
    4.2. To calculate the average, divide the sum you calculated before by the
length of the array (because that's the number of elements)
    4.3. Call the function with the 'totals' array
*/
const bills1 = [ 22, 295, 176, 440, 37, 105, 10, 1100, 86, 52 ];
const tips1 = [],
	totals1 = [];
for (let i = 0; i < bills1.length; i++) {
	const tip = calcTip(bills1[i]);
	tips1.push(tip);
	totals1.push(bills1[i] + tip);
}
console.log(`Bills: ${bills1}`);
console.log(`Tips: ${tips1}`);
console.log(`Totals: ${totals1}`);

const calcAverage = function(arr) {
	let sum = 0;
	for (let i = 0; i < arr.length; i++) sum += arr[i];
	return sum / arr.length;
};
console.log(`Average of totals = ${calcAverage(totals1)}`);
console.log(`Average of tips = ${calcAverage(tips1)}`);
