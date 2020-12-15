/* Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula:
BMI = mass / height ** 2 = mass / (height * height) (mass in kg and height in meter) */

/* 1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both
versions)
3. Create a Boolean variable 'markHigherBMI' containing information about
whether Mark has a higher BMI than John */

const mass_Mark = 75,
	mass_John = 86,
	height_Mark = 1.83,
	height_John = 1.86;
const bmi_Mark = mass_Mark / height_Mark ** 2,
	bmi_John = mass_John / height_John ** 2;
const markHigherBMI = bmi_Mark > bmi_John;
console.log('Mark:', mass_Mark, height_Mark, bmi_Mark);
console.log('John:', mass_John, height_John, bmi_John);
if (markHigherBMI) {
	console.log("Mark's BMI is higher than John");
} else {
	console.log("Mark's BMI is lower than John");
}
