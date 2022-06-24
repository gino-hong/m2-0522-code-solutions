const add = require('./add');
const subtract = require('./subtract');
const multiply = require('./multiply');
const divide = require('./divide');

const operator = process.argv[3];
const number1 = parseInt(process.argv[2]);
const number2 = parseInt(process.argv[4]);

if (operator === 'plus') {
  console.log('result:', add(number1, number2));
}

if (operator === 'minus') {
  console.log('result:', subtract(number1, number2));
}

if (operator === 'times') {
  console.log('result:', multiply(number1, number2));
}

if (operator === 'over') {
  console.log('result:', divide(number1, number2));
}
