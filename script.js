const display = document.getElementById("display");
const numericButtons = document.querySelectorAll(".numeric_btn");
const operationButtons = document.querySelectorAll(".operation_btn");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");
const liveResult = document.getElementById("live-result");
const historyDiv = document.getElementById("history");

let expression = "";
let history = [];

function updateDisplay(value) {
  display.value = value;
  updateLiveResult();
}

function appendToExpression(value) {
  if (value === ".") {
    // Get the last number segment by splitting on operators
    const parts = expression.split(/[\+\-\*\/\(\)]/);
    console.log(parts);

    const lastNumber = parts[parts.length - 1];
    console.log(lastNumber);

    // Prevent more than one decimal in the current number
    if (lastNumber.includes(".")) {
      return;
    }
  }

  expression += value;
  updateDisplay(expression);
}

function evaluateExpression() {
  try {
    if (/^[0-9+\-*/.() ]+$/.test(expression)) {
      const result = new Function(`return ${expression}`)();
      history.unshift(`${expression} = ${result}`);
      if (history.length > 10) history.pop();
      updateHistory();
      expression = result.toString();
      updateDisplay(expression);
    } else {
      throw new Error("Invalid characters");
    }
  } catch {
    display.value = "Error";
    expression = "";
  }
}

function updateLiveResult() {
  try {
    if (/^[0-9+\-*/.() ]+$/.test(expression)) {
      const result = new Function(`return ${expression}`)();
      liveResult.textContent = `= ${result}`;
    } else {
      liveResult.textContent = "";
    }
  } catch {
    liveResult.textContent = "";
  }
}

function updateHistory() {
  if (history.length === 0) {
    historyDiv.innerHTML = "";
    return;
  }

  historyDiv.innerHTML =
    "<h3>History</h3>" + history.map((entry) => `<p>${entry}</p>`).join("");
}

function clearAll() {
  expression = "";
  updateDisplay("");
  liveResult.textContent = "";
}

// Button click events
numericButtons.forEach((button) => {
  button.addEventListener("click", () =>
    appendToExpression(button.textContent)
  );
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () =>
    appendToExpression(button.textContent)
  );
});

equalsButton.addEventListener("click", evaluateExpression);
clearButton.addEventListener("click", clearAll);

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (/[0-9+\-*/().]/.test(e.key)) {
    appendToExpression(e.key);
  } else if (e.key === "Enter") {
    e.preventDefault();
    evaluateExpression();
  } else if (e.key === "Backspace") {
    expression = expression.slice(0, -1);
    updateDisplay(expression);
  } else if (e.key === "Escape") {
    clearAll();
  }
});
