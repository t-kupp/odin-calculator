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
let disableNumbers = false;
let disableOperators = true;

// Add event listeners for buttons
numberButtons.forEach((button) =>
  button.addEventListener("click", () => setNumber(button.value))
);

operatorButtons.forEach((button) =>
  button.addEventListener("click", () => setOperator(button.value))
);

// Set the number and operator
function setNumber(number) {
  if (
    calculationDisplay.textContent.toString().length > 16 ||
    resultDisplay.textContent.toString().length > 13
  )
    return;
  if (disableNumbers == true) return;
  if (calculationDisplay.textContent == 0) calculationDisplay.textContent = "";
  calculationDisplay.textContent += number;
  disableEqualBtn = false;
  disableOperators = false;
}

function setOperator(operator) {
  if (
    calculationDisplay.textContent.toString().length > 16 ||
    resultDisplay.textContent.toString().length > 13
  )
    return;
  if (calculationDisplay.textContent == 0 || disableOperators == true) return;
  if (firstCalculation == false) calculationDisplay.textContent = "";
  calculationDisplay.textContent += operator;
  disableEqualBtn = false;
  disableNumbers = false;
  disableOperators = true;
}

// Equal button executes evaluation
equalBtn.addEventListener("click", () => calculate());
function calculate() {
  if (
    calculationDisplay.textContent.toString().length > 17 ||
    resultDisplay.textContent.toString().length > 14
  )
    return;
  if (disableEqualBtn == true) return;
  if (firstCalculation == false) {
    result = eval(
      (resultDisplay.textContent += calculationDisplay.textContent)
    );
    resultDisplay.textContent = parseFloat(result.toFixed(12));
    disableNumbers = true;
    return;
  }
  result = eval(calculationDisplay.textContent);
  resultDisplay.textContent = parseFloat(result.toFixed(12));
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
}

// +/- button
negativeBtn.addEventListener("click", () => negate());
function negate() {
  if (resultDisplay.textContent == "") return;
  resultDisplay.textContent = eval(
    resultDisplay.textContent - resultDisplay.textContent * 2
  );
}

// % button
percentBtn.addEventListener("click", () => percentage());
function percentage() {
  result = eval(resultDisplay.textContent / 100);
  resultDisplay.textContent = parseFloat(result.toFixed(10));
}
