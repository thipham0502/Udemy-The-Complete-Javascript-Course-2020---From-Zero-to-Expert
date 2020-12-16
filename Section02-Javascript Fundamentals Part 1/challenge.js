/* Challenge #1: Mark and John are trying to compare their BMI (Body Mass Index), which is 
calculated using the formula:
BMI = mass / height ** 2 = mass / (height * height) (mass in kg and height in meter)

1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both
versions)
3. Create a Boolean variable 'markHigherBMI' containing information about
whether Mark has a higher BMI than John */

/* Challenge #2: 
1. Print a nice output to the console, saying who has the higher BMI. The message
is either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
2. Use a template literal to include the BMI values in the outputs. Example: "Mark's
BMI (28.3) is higher than John's (23.9)!" */

const mass_Mark = 75,
	mass_John = 86,
	height_Mark = 1.83,
	height_John = 1.86;
const bmi_Mark = mass_Mark / height_Mark ** 2,
	bmi_John = mass_John / height_John ** 2;
const markHigherBMI = bmi_Mark > bmi_John;
console.log('Mark:', mass_Mark, height_Mark, bmi_Mark);
console.log('John:', mass_John, height_John, bmi_John);
if (markHigherBMI) console.log(`Mark's BMI: ${bmi_Mark.toFixed(2)} is higher than John's: ${bmi_John.toFixed(2)}!`);
else console.log(`John's BMI: ${bmi_John.toFixed(2)} is higher than Mark's: ${bmi_Mark.toFixed(2)}!`);

/* Challenge #3: 
There are two gymnastics teams, Dolphins and Koalas. They compete against each 
other 3 times. The winner with the highest average score wins a trophy!

1. Calculate the average score for each team, using the test data below:
Test data:
Data 1: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
Data Bonus 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
Data Bonus 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106

2. Compare the team's average scores to determine the winner of the competition,
and print it to the console. Don't forget that there can be a draw, so test for that
as well (draw means they have the same average score)

3. Bonus 1: Include a requirement for a minimum score of 100. With this rule, a
team only wins if it has a higher score than the other team, and the same time a
score of at least 100 points. Hint: Use a logical operator to test for minimum
score, as well as multiple else-if blocks 😉

4. Bonus 2: Minimum score also applies to a draw! So a draw only happens when
both teams have the same score and both have a score greater or equal 100
points. Otherwise, no team wins the trophy */
const avgDolphins = (96 + 108 + 89) / 3,
	avgKoalas = (88 + 91 + 110) / 3;
if (avgDolphins > avgKoalas) console.log('Dolphins win!');
else if (avgDolphins < avgKoalas) console.log('Koalas win!');
else console.log('Draw!');
