const resultDisplay = document.getElementById("result-display");
const calculationDisplay = document.getElementById("calculation-display");
const cBtn = document.getElementById("c-btn");
const ceBtn = document.getElementById("ce-btn");
const percentBtn = document.getElementById("percent-btn");
const equalBtn = document.getElementById("equal-btn");
const dotButton = document.getElementById("dot-btn");
const nullBtn = document.getElementById("null-btn");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
let firstCalculation = true;
let disableEqualBtn = false;
let disableNumbers = false;
let disableOperators = true;
let disableDotBtn = false;

// Add event listeners for keyboard inputs
document.addEventListener("keydown", (e) => {
  if (e.key == "*" || e.key == "/" || e.key == "+" || e.key == "-") setOperator(e.key);
  if (e.key >= 0) setNumber(e.key);
  if (e.key == "Enter") calculate();
  if (e.key == "c" || e.key == "Escape") reset();
  if (e.key == "Backspace") backSpace();
  if (e.key == "," || e.key == ".") insertDot()
})

// Add event listeners for buttons
numberButtons.forEach((button) =>
  button.addEventListener("click", () => setNumber(button.value))
);

operatorButtons.forEach((button) =>
  button.addEventListener("click", () => setOperator(button.value))
);

// Set the number and operator
function setNumber(number) {
  if (calculationDisplay.textContent.length >= 18) return;
  if (disableNumbers == true) return;
  if (calculationDisplay.textContent == 0) calculationDisplay.textContent = "";
  calculationDisplay.textContent += number;
  disableEqualBtn = false;
  disableOperators = false;
}

function setOperator(operator) {
  if (calculationDisplay.textContent.length >= 18) return;
  if (calculationDisplay.textContent == 0 || disableOperators == true) return;
  if (firstCalculation == false)
    calculationDisplay.textContent = resultDisplay.textContent;
  calculationDisplay.textContent += operator;
  disableEqualBtn = false;
  disableNumbers = false;
  disableOperators = true;
  disableDotBtn = false;
}

// Equal button executes evaluation
equalBtn.addEventListener("click", () => calculate());
function calculate() {
  if (disableEqualBtn == true) return;
  if (firstCalculation == false) {
    result = eval(calculationDisplay.textContent);
    resultDisplay.textContent = parseFloat(result.toFixed(10));
    disableNumbers = true;
    return;
  }
  result = eval(calculationDisplay.textContent);
  resultDisplay.textContent = parseFloat(result.toFixed(10));
  firstCalculation = false;
  disableEqualBtn = true;
  disableNumbers = true;
}

// C button resets the displays
cBtn.addEventListener("click", () => reset());
function reset() {
  resultDisplay.textContent = "";
  calculationDisplay.textContent = "0";
  firstCalculation = true;
  disableNumbers = false;
  disableDotBtn = false;
}

// CE button removes latest character
ceBtn.addEventListener("click", () => backSpace());
function backSpace() {
  calculationDisplay.textContent = calculationDisplay.textContent.slice(0, -1)
  disableOperators = false;
  disableEqualBtn = false;
  disableNumbers = false;
}

// % button
percentBtn.addEventListener("click", () => percentage());
function percentage() {
  result = eval(resultDisplay.textContent / 100);
  if (result.length > 15) resultDisplay.textContent = parseFloat(result.toFixed(18));
}

// dot button
dotButton.addEventListener("click", () => insertDot());
function insertDot() {
  if (calculationDisplay.textContent.slice(-1) == "." || disableDotBtn == true)
    return;
  setNumber(dotButton.value);
  disableDotBtn = true;
}

