let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
let currentCalculation = "";

const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screen.innerText = currentCalculation || buffer;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;
      currentCalculation = "";
      break;
    case "=":
    case "&equals;":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal.toString();
      currentCalculation = buffer;
      runningTotal = 0;
      break;
    case "←":
    case "&larr;":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      currentCalculation = currentCalculation.slice(0, -1);
      break;
    case "+":
    case "&plus;":
    case "-":
    case "&minus;":
    case "×":
    case "&times;":
    case "÷":
    case "&divide;":
      handleMath(symbol);
      break;
  }
}

function handleMath(symbol) {
  if (buffer === "0") {
    return;
  }
  const intBuffer = parseInt(buffer);

  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  previousOperator = symbol;
  currentCalculation += ` ${symbol} `;
  buffer = "0";
}

function flushOperation(intBuffer) {
  if (previousOperator === "+" || previousOperator === "&plus;") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-" || previousOperator === "&minus;") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "×" || previousOperator === "&times;") {
    runningTotal *= intBuffer;
  } else if (previousOperator === "÷" || previousOperator === "&divide;") {
    runningTotal /= intBuffer;
  }
}

function handleNumber(numberString) {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
  if (currentCalculation.endsWith(" ")) {
    currentCalculation += numberString;
  } else {
    currentCalculation = buffer;
  }
}

function init() {
  const buttons = document.querySelectorAll(".calc-buttons .calc-button");
  buttons.forEach((button) => {
    button.addEventListener("click", function (event) {
      buttonClick(event.target.innerHTML);
    });
  });
}

init();
