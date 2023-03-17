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
let disableDotBtn = false;

// Add event listeners for keyboard inputs
document.addEventListener("keydown", (e) => {
  if (e.key == "*" || e.key == "/" || e.key == "+" || e.key == "-") {
    setOperator(e.key);
  } else if (e.key >= 0) {
    setNumber(e.key);
  } else if (e.key == "Enter") {
    calculate();
  }
});

// Add event listeners for buttons
numberButtons.forEach((button) =>
  button.addEventListener("click", () => setNumber(button.value))
);

operatorButtons.forEach((button) =>
  button.addEventListener("click", () => setOperator(button.value))
);

// Set the number and operator
function setNumber(number) {
  if (disableNumbers == true) return;
  if (calculationDisplay.textContent == 0) calculationDisplay.textContent = "";
  calculationDisplay.textContent += number;
  disableEqualBtn = false;
  disableOperators = false;
}

function setOperator(operator) {
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
  disableDotBtn = false;
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
  resultDisplay.textContent = parseFloat(result.toFixed(12));
}

// dot button
dotButton.addEventListener("click", () => insertDot());
function insertDot() {
  if (calculationDisplay.textContent.slice(-1) == "." || disableDotBtn == true)
    return;
  setNumber(dotButton.value);
  disableDotBtn = true;
}
