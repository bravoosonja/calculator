//global variables
let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldResetScreen = false;

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

//event listeners
window.addEventListener("keydown", handleKeyboardInput);
clearButton.addEventListener("click", clear);
equalsButton.addEventListener("click", updateDisplay);
deleteButton.addEventListener("click", deleteOne);

numberButtons.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);

operatorButtons.forEach((button) =>
  button.addEventListener("click", () => chooseOperation(button.textContent))
);

//takes user input and converts it to string. prevents multiple . input
function appendNumber(number) {
  if (currentOperationScreen.textContent === "0" || shouldResetScreen)
    resetScreen();
  currentOperationScreen.textContent += number;
}

function resetScreen() {
  currentOperationScreen.textContent = "";
  shouldResetScreen = false;
}

//puts last operation to last operation screen and updates current operation
function chooseOperation(operator) {
  if (currentOperation !== null) updateDisplay();
  firstOperand = currentOperationScreen.textContent;
  currentOperation = operator;
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
  shouldResetScreen = true;
}

//deletes all values and clears screen
function clear() {
  currentOperationScreen.textContent = "";
  lastOperationScreen.textContent = "";
  firstOperand = "";
  secondOperand = "";
  currentOperation = null;
}

//Deletes everything; equivalent to AC
function deleteOne() {
  currentOperationScreen.textContent = currentOperationScreen.textContent
    .toString()
    .slice(0, -1);
}

//takes an operator and 2 numbers and then calls one of the above functions on the numbers
function compute(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "−":
      return substract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      if (b === 0) return null;
      else return divide(a, b);
    default:
      return null;
  }
}

//updates values inside of screen
function updateDisplay() {
  if (currentOperation === null) return;
  if (currentOperation === "÷" && currentOperationScreen.textContent === "0") {
    alert("You can't divide a number by 0!");
    return;
  }
  secondOperand = currentOperationScreen.textContent;
  currentOperationScreen.textContent = roundResult(
    compute(currentOperation, firstOperand, secondOperand)
  );
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  currentOperation = null;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

//converts integer to float
function getDisplayNumber(number) {
  const stringNumber = number.toString();
  const integerDigits = parseFloat(stringNumber.split(".")[0]);
  const decimalDigits = stringNumber.split(".")[1];
  let integerDisplay;
  if (isNaN(integerDigits)) {
    integerDisplay = "";
  } else {
    integerDisplay = integerDigits.toLocaleString("en", {
      maximumFractionDigits: 0,
    });
  }
  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`;
  } else {
    return integerDisplay;
  }
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === ".") appendNumber(e.key);
  if (e.key === "=" || e.key === "Enter") updateDisplay();
  if (e.key === "Backspace") deleteOne();
  if (e.key === "Escape") clear();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    chooseOperation(convertOperator(e.key));
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === "/") return "÷";
  if (keyboardOperator === "*") return "×";
  if (keyboardOperator === "-") return "−";
  if (keyboardOperator === "+") return "+";
}

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
