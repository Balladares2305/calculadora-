"use strict";

const display = document.querySelector("#display");
const expression = document.querySelector("#expression");
const keypad = document.querySelector(".keypad");

let currentValue = "0";
let storedValue = null;
let pendingOperator = null;
let shouldStartNewValue = false;
let hasError = false;

const operatorSymbols = {
  "+": "+",
  "-": "−",
  "*": "×",
  "/": "÷",
};

function render() {
  display.textContent = currentValue;
}

function clear() {
  currentValue = "0";
  storedValue = null;
  pendingOperator = null;
  shouldStartNewValue = false;
  hasError = false;
  expression.textContent = "";
  render();
}

function showError(message) {
  currentValue = message;
  storedValue = null;
  pendingOperator = null;
  shouldStartNewValue = true;
  hasError = true;
  expression.textContent = "";
  render();
}

function inputDigit(digit) {
  if (hasError) clear();

  if (shouldStartNewValue) {
    currentValue = digit;
    shouldStartNewValue = false;
  } else if (currentValue === "0") {
    currentValue = digit;
  } else if (currentValue.replace("-", "").length < 15) {
    currentValue += digit;
  }
  render();
}

function inputDecimal() {
  if (hasError) clear();

  if (shouldStartNewValue) {
    currentValue = "0.";
    shouldStartNewValue = false;
  } else if (!currentValue.includes(".")) {
    currentValue += ".";
  }
  render();
}

function formatNumber(number) {
  if (!Number.isFinite(number)) return null;
  const rounded = Number.parseFloat(number.toPrecision(12));
  return String(Object.is(rounded, -0) ? 0 : rounded);
}

function calculate() {
  if (storedValue === null || pendingOperator === null) return;

  const first = Number(storedValue);
  const second = Number(currentValue);
  let result;

  switch (pendingOperator) {
    case "+":
      result = first + second;
      break;
    case "-":
      result = first - second;
      break;
    case "*":
      result = first * second;
      break;
    case "/":
      if (second === 0) {
        showError("No se puede dividir entre 0");
        return;
      }
      result = first / second;
      break;
    default:
      return;
  }

  const formattedResult = formatNumber(result);
  if (formattedResult === null) {
    showError("Resultado no válido");
    return;
  }

  expression.textContent = `${storedValue} ${operatorSymbols[pendingOperator]} ${currentValue} =`;
  currentValue = formattedResult;
  storedValue = null;
  pendingOperator = null;
  shouldStartNewValue = true;
  hasError = false;
  render();
}

function chooseOperator(operator) {
  if (hasError) return;

  if (pendingOperator !== null && !shouldStartNewValue) {
    calculate();
    if (hasError) return;
  }

  storedValue = currentValue;
  pendingOperator = operator;
  shouldStartNewValue = true;
  expression.textContent = `${currentValue} ${operatorSymbols[operator]}`;
}

function deleteLast() {
  if (hasError) {
    clear();
    return;
  }
  if (shouldStartNewValue) return;

  currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : "0";
  if (currentValue === "-") currentValue = "0";
  render();
}

function toggleSign() {
  if (hasError) return;
  if (currentValue === "0") return;

  currentValue = currentValue.startsWith("-")
    ? currentValue.slice(1)
    : `-${currentValue}`;
  shouldStartNewValue = false;
  render();
}

function handleAction(action) {
  switch (action) {
    case "clear":
      clear();
      break;
    case "delete":
      deleteLast();
      break;
    case "sign":
      toggleSign();
      break;
    case "decimal":
      inputDecimal();
      break;
    case "equals":
      calculate();
      break;
    default:
      break;
  }
}

keypad.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.digit !== undefined) {
    inputDigit(button.dataset.digit);
  } else if (button.dataset.operator !== undefined) {
    chooseOperator(button.dataset.operator);
  } else {
    handleAction(button.dataset.action);
  }
});

document.addEventListener("keydown", (event) => {
  if (/^\d$/.test(event.key)) {
    inputDigit(event.key);
  } else if (event.key === "." || event.key === ",") {
    inputDecimal();
  } else if (Object.hasOwn(operatorSymbols, event.key)) {
    chooseOperator(event.key);
  } else if (event.key === "Enter" || event.key === "=") {
    event.preventDefault();
    calculate();
  } else if (event.key === "Backspace") {
    deleteLast();
  } else if (event.key === "Escape" || event.key === "Delete") {
    clear();
  }
});
