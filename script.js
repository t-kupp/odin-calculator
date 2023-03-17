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

// disable default key presses (space bar and enter)
document.addEventListener("keydown", (e) => {
  if (e.code == "Space" || e.code == "Enter") e.preventDefault();
});
document.addEventListener("keyup", (e) => {
  if (e.code == "Space" || e.code == "Enter") e.preventDefault();
});
document.addEventListener("keypress", (e) => {
  if (e.code == "Space" || e.code == "Enter") e.preventDefault();
});

// Add event listeners for keyboard inputs
document.addEventListener("keydown", (e) => {
  if (e.key == "+" || e.key == "-") {
    setOperator(e.key);
  } else if (e.key == "*") {
    setOperator("x");
  } else if (e.key == "/") {
    setOperator("÷");
  } else if (
    e.key == "1" ||
    e.key == "2" ||
    e.key == "3" ||
    e.key == "4" ||
    e.key == "5" ||
    e.key == "6" ||
    e.key == "7" ||
    e.key == "8" ||
    e.key == "9"
  ) {
    setNumber(e.key);
  } else if (e.key == "Enter") {
    calculate();
  } else if (e.key == "c" || e.key == "Escape") {
    reset();
  } else if (e.key == "Backspace") {
    backSpace();
  } else if (e.key == "," || e.key == ".") {
    insertDot();
  } else if (e.key == "%") {
    percentage();
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
  disableEqualBtn = true;
  disableNumbers = false;
  disableOperators = true;
  disableDotBtn = false;
}

// Equal button executes evaluation
equalBtn.addEventListener("click", () => calculate());
function calculate() {
  convertTokens();
  if (disableEqualBtn == true) {
    convertBack();
    return;
  }
  if (firstCalculation == false) {
    result = eval(calculationDisplay.textContent);
    resultDisplay.textContent = parseFloat(result.toFixed(10));
    convertBack();
    disableNumbers = true;
  } else {
    result = eval(calculationDisplay.textContent);
    resultDisplay.textContent = parseFloat(result.toFixed(10));
    convertBack();
    firstCalculation = false;
    disableEqualBtn = true;
    disableNumbers = true;
  }
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
  if (
    !calculationDisplay.textContent
      .substring(calculationDisplay.textContent.length - 1)
      .includes(".")
  )
    disableDotBtn = false;
  calculationDisplay.textContent = calculationDisplay.textContent.slice(0, -1);
  disableOperators = false;
  disableEqualBtn = false;
  disableNumbers = false;
}

// % button
percentBtn.addEventListener("click", () => percentage());
function percentage() {
  result = eval(resultDisplay.textContent / 100);
  resultDisplay.textContent = parseFloat(result.toFixed(15));
}
// dot button
dotButton.addEventListener("click", () => insertDot());
function insertDot() {
  if (calculationDisplay.textContent.slice(-1) == "." || disableDotBtn == true)
    return;
  setNumber(dotButton.value);
  disableDotBtn = true;
}

//prettier-ignore
// Convert tokens to mathematical equivalents
function convertTokens() {
  calculationDisplay.textContent = calculationDisplay.textContent.replace("x", "*");
  calculationDisplay.textContent = calculationDisplay.textContent.replace("÷", "/");
}

//prettier-ignore
// Convert back
function convertBack() {
  calculationDisplay.textContent = calculationDisplay.textContent.replace("*", "x");
  calculationDisplay.textContent = calculationDisplay.textContent.replace("/", "÷");
}
