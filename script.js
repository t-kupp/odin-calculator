const resultDisplay = document.getElementById("result-display");
const calculationDisplay = document.getElementById("calculation-display");
const cBtn = document.getElementById("c-btn");
const negativeBtn = document.getElementById("negative-btn");
const percentBtn = document.getElementById("percent-btn");
const equalBtn = document.getElementById("equal-btn");
const dotButton = document.getElementById("dot-btn");
const nullBtn = document.getElementById("null-btn");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
let firstCalculation = true;
let disableEqualBtn = false;

// Add event listeners for buttons
numberButtons.forEach((button) =>
  button.addEventListener("click", () => setNumber(button.value))
);

operatorButtons.forEach((button) =>
  button.addEventListener("click", () => setOperator(button.value))
);

// Set the number and operator
function setNumber(number) {
  if (calculationDisplay.textContent == 0) calculationDisplay.textContent = "";
  calculationDisplay.textContent += number;
  disableEqualBtn = false;
}

function setOperator(operator) {
  if (firstCalculation == false) calculationDisplay.textContent = "";
  calculationDisplay.textContent += operator;
  disableEqualBtn = false;
}

// Equal button executes evaluation
equalBtn.addEventListener("click", () => calculate());
function calculate() {
  if (disableEqualBtn == true) return;
  if (firstCalculation == false) {
    result = eval(
      (resultDisplay.textContent += calculationDisplay.textContent)
    );
    resultDisplay.textContent = parseFloat(result.toFixed(6));
    return;
  }
  result = eval(calculationDisplay.textContent);
  resultDisplay.textContent = parseFloat(result.toFixed(6));
  firstCalculation = false;
  disableEqualBtn = true;
}

// C button resets the displays
cBtn.addEventListener("click", () => reset());
function reset() {
  firstCalculation = true;
  resultDisplay.textContent = "";
  calculationDisplay.textContent = "0";
}
