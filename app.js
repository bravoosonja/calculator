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

//main functions
//takes user input
function appendNumber(number) {
  if (currentOperationScreen.textContent === "0" || shouldResetScreen)
    resetScreen();
  currentOperationScreen.textContent += number;
}

//resets screen to prevent appending numbers after operators
function resetScreen() {
  currentOperationScreen.textContent = "";
  shouldResetScreen = false;
}

//moves the current operation to last operation screen
function chooseOperation(operator) {
  if (currentOperation !== null) updateDisplay();
  firstOperand = currentOperationScreen.textContent;
  currentOperation = operator;
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
  shouldResetScreen = true;
}

//deletes all values AC function on calculator
function clear() {
  currentOperationScreen.textContent = "";
  lastOperationScreen.textContent = "";
  firstOperand = "";
  secondOperand = "";
  currentOperation = null;
}

//Deletes a single last input
function deleteOne() {
  currentOperationScreen.textContent = currentOperationScreen.textContent
    .toString()
    .slice(0, -1);
}

//takes an operator and 2 numbers and then calls one of the arithmetic functions on the numbers
function compute(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "−":
      return subtract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      if (b === 0) return NaN;
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

//rounds results to 3 digits
function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

//converts number inputs
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

//allows keyboard input
function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === ".") appendNumber(e.key);
  if (e.key === "=" || e.key === "Enter") updateDisplay();
  if (e.key === "Backspace") deleteOne();
  if (e.key === "Escape") clear();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    chooseOperation(convertOperator(e.key));
}

//allows keyboard input for operators
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
