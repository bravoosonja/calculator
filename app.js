//buttons & selectors
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-clear]");
const pointButton = document.getElementById("point-btn");
const lastOperationScreen = document.getElementById("last-operation-screen");
const currentOperationScreen = document.getElementById(
  "current-operation-screen"
);

//displays - class calculator
//?? is this necessary?
class Calculator {
  constructor(lastOperationScreen, currentOperationScreen) {
    this.lastOperationScreen = lastOperationScreen;
    this.currentOperationScreen = currentOperationScreen;
    this.clear();
  }
}

const calculator = new Calculator(lastOperationScreen, currentOperationScreen);

//event listeners
window.addEventListener("keydown", handleKeyboardInput);
equalsButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", deleteNumber);
pointButton.addEventListener("click", appendPoint);

numberButtons.forEach((button) =>
  button.addEventListener("click", () =>
    calculator.appendNumber(button.textContent)
  )
);

operatorButtons.forEach((button) =>
  button.addEventListener("click", () =>
    calculator.updateDisplay(button.textContent)
  )
);

//deletes all values and clears screen
function clear() {
  this.currentOperationScreen = "";
  this.lastOperationScreen = "";
  this.operation = undefined;
}

//Deletes everything; equivalent to AC
function deleteOne() {}

//takes user input
function appendNumber() {}

//controls operation
//? is this necessary?
function chooseOperation() {}

//displays result
function compute() {}

//updates values inside of screen
function updateDisplay() {}

//arithmetic functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

//takes an operator and 2 numbers and then calls one of the above functions on the numbers
function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "x":
      return multiply(a, b);
    case "÷":
      if (b === 0) return null;
      else return divide(a, b);
    default:
      return null;
  }
}
