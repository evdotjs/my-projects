let total = 0;
let currentNumber = [total]; //the number that is being typed
let equation = []; //displays all numbers and operators typed
let displayNumber = document.querySelector('h2');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');

//updates the display (<h2>) to show currentNumber
function updateDisplay() {
  displayNumber.innerHTML = parseInt(currentNumber.join(""));
}

//reset currentNumber to 0 and
function clear() {
  currentNumber = [0];
  document.querySelector('h2').innerHTML = currentNumber;
}

function equals() {
  equation.push(parseInt(displayNumber.innerHTML));
  equation.push('=');
  switch (equation[1]) {
    case '+':
      total = equation[0] + equation[2];
      break;
    case '-':
      total = equation[0] - equation[2];
      break;
    case '×':
      total = equation[0] * equation[2];
      break;
    case '÷':
      total = equation[0] / equation[2];
      break;
    default:
      total = parseInt(currentNumber.join(""));
  }
  clear();
  displayNumber.innerHTML = total;
  document.querySelector('.equation').innerHTML = equation.join(" ");
}

function operate() {
  //if operator is pressed immediatately after equals sign is pressed
  if (equation[equation.length-1 ] === '=') {
    //reset the equation to the last answer
    equation = [total];
  }
  //the number typed before the operator will be added to the equation array
  else {
    total = parseInt(currentNumber.join(""));
    equation.push(total);
  }

  //operate on the first two numbers in the equation array
  if (equation.length > 2) {
    equals();
    equation = [total];
  }

  //add the selected operator to the equation array
  equation.push(this.innerHTML);
  clear();

  //show the equation array at the top of the screen
  document.querySelector('.equation').innerHTML = equation.join(" ");
} //operate

//reset total and equation when C button pressed
document.querySelector('.clear').addEventListener('click', event => {
  clear();
  total = 0;
  equation = [];
  document.querySelector('.equation').innerHTML = equation;
});

//add numbers to currentNumber when button pressed
numbers.forEach(number => number.addEventListener('click', event => {
  if (currentNumber[0] === 0) {
    currentNumber.shift();
  }
  if ( currentNumber.length < 12 ) {
    currentNumber.push(number.innerHTML);
    updateDisplay();
  }
}) );

//remove last number from currentNumber array
document.querySelector('.back').addEventListener('click', event => {
  currentNumber.pop();
  if (currentNumber[0] == undefined) {
    clear();
  }
  updateDisplay();
});


//run operate function when [+,-,×,÷] buttons are pressed
operators.forEach(operator => operator.addEventListener('click', operate) );

//evaluate the equation when [=] button is presesed
document.querySelector('.equals').addEventListener('click', equals);
