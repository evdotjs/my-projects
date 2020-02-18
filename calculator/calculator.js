let total = 0;
let currentNumber = [total]; //the number that is being typed
let equation = []; //displays all numbers and operators typed
let displayNumber = document.querySelector('h2');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');

//updates the display (<h2>) to show currentNumber
function updateDisplay() {
  displayNumber.innerHTML = currentNumber.join("");
}

//reset currentNumber and displayNumber to 0
function clear() {
  currentNumber = [0];
  displayNumber.innerHTML = currentNumber;
}

//operate on the first number in the equation and the current number in the display
function getTotal(operator) {
  switch (operator) {
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
      total = parseFloat(currentNumber.join(""));
  }
}

function equals() {
  equation.push(parseFloat(displayNumber.innerHTML));
  equation.push('=');
  document.querySelector('.equation').innerHTML = equation.join(" ");
  getTotal(equation[1]);
  clear();
  displayNumber.innerHTML = total;
}

function operate() {
  //if operator is pressed immediatately after equals sign is pressed
  if (equation[equation.length-1 ] === '=') {
    //reset the equation to the last answer
    equation = [total];
  }
  //the current number will be added to the equation array
  else {
    total = parseFloat(currentNumber.join(""));
    equation.push(total);
  }

  //calculate the total of the first two numbers in the equation array
  if (equation.length > 2) {
    equals();
    equation = [total];
  }

  //add the selected operator to the equation array
  equation.push(this.innerHTML);
  clear();

  //show the equation array at the top of the screen
  document.querySelector('.equation').innerHTML = equation.join(" ");
}


function back() {
  currentNumber.pop();
  if (currentNumber[0] == undefined) {
    clear();
  }
  updateDisplay();
}

//reset total and equation when C button pressed
document.querySelector('.clear').addEventListener('click', event => {
  clear();
  total = 0;
  equation = [];
  document.querySelector('.equation').innerHTML = equation;
});

//add numbers to currentNumber when button pressed
numbers.forEach(number => number.addEventListener('click', event => {
  if (currentNumber[0] == 0) {
    currentNumber.shift();
  }
  if ( currentNumber.length < 12 ) {
    currentNumber.push(number.innerHTML);
    updateDisplay();
  }
}) );

//turn currentNumber negative if positive
document.querySelector('.negative').addEventListener('click', event => {
  currentNumber[0] == '-' ?
    currentNumber.shift():
    currentNumber.unshift('-');
  updateDisplay();
});

//call back() function when button is clicked or backspace key is pressed
document.querySelector('.back').addEventListener('click', event => back());

//run operate function when [+,-,×,÷] buttons are pressed
operators.forEach(operator => operator.addEventListener('click', operate) );

//evaluate the equation when [=] button is presesed
document.querySelector('.equals').addEventListener('click', equals);

//listen for keyboard input
document.addEventListener('keydown', event => {
  //console.log(event.key);
  if (event.key === 'Backspace') {
    back();
  } else if (event.key === 'Escape') {
    clear();
    total = 0;
    equation = [];
    document.querySelector('.equation').innerHTML = equation;
  }
});
