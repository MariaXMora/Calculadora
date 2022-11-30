let operator = "";
let previousValue = "";
let currentValue = "";

// with this the keyboard works!
window.addEventListener("keydown", keyPress);

let display = document.getElementById("display");
let clear = document.querySelector("#clearBtn");
let equal = document.querySelector(".equals");
let decimal = document.querySelector(".decimal");
let arrow = document.querySelector(".arrow");

let numbers = document.querySelectorAll(".digit");
let operators = document.querySelectorAll(".operator");

let previousDisplay = document.querySelector(".previous");
let currentDisplay = document.querySelector(".current");

numbers.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    getNumber(e.target.textContent);
    currentDisplay.textContent = currentValue;
  });
});

operators.forEach((op) =>
  op.addEventListener("click", function (e) {
    getOperator(e.target.textContent);
    previousDisplay.textContent = previousValue + " " + operator;
    currentDisplay.textContent = currentValue;
  })
);

clear.addEventListener("click", function () {
  previousValue = "";
  currentValue = "";
  operator = "";
  previousDisplay.textContent = "";
  currentDisplay.textContent = "0";
});

equal.addEventListener("click", function () {
  //para quitar el Nan del display
  if (currentValue != "" && previousValue != "") {
    compute();
  }
});

decimal.addEventListener("click", function () {
  addDecimal();
});

arrow.addEventListener("click", function () {
  backSpace();
});

//el parametro tiene que tener el minsmo valor en forEach y de la funcion

//funciones
function getNumber(num) {
  if (previousValue !== "" && currentValue !== "" && operator === "") {
    previousValue = "";
    currentDisplay.textContent = currentValue;
  }
  if (currentValue.length <= 9) {
    currentValue += num;
    currentDisplay.textContent = currentValue;
  }
}

function getOperator(op) {
  if (previousValue === "") {
    previousValue = currentValue;
    operatorCheck(op);
  } else if (currentValue === "") {
    operatorCheck(op);
  } else {
    compute();
    operator = op;
    currentDisplay.textContent = "0";
    previousDisplay.textContent = previousValue + " " + operator;
  }
}

function operatorCheck(text) {
  operator = text;
  previousDisplay.textContent = previousValue + " " + operator;
  currentDisplay.textContent = "0";
  currentValue = "";
}

function compute() {
  previousValue = Number(previousValue);
  currentValue = Number(currentValue);

  if (operator === "+") {
    previousValue += currentValue;
  } else if (operator === "-") {
    previousValue -= currentValue;
  } else if (operator === "*") {
    previousValue *= currentValue;
  } else if (operator === "/") {
    if (currentValue <= 0) {
      previousValue = "ERROR LUCERITO";
      previousDisplay.textContent = "";
      currentDisplay.textContent = previousValue;
      operator = "";
      return;
    }
    previousValue /= currentValue;
  }
  previousValue = roundNumber(previousValue);
  previousValue = previousValue.toString();
  currentValue = previousValue.toString();
  displayResults();
}

function roundNumber(num) {
  return Math.round(num * 1000) / 1000;
}

function addDecimal() {
  // we gonna use includes function to check if it has a dot already or we have to put one
  if (!currentValue.includes(".")) {
    currentValue += ".";
    currentDisplay.textContent = currentValue;
  }
}

function displayResults() {
  if (previousValue.length <= 11) {
    currentDisplay.textContent = previousValue;
  } else {
    currentDisplay.textContent = previousValue.slice(0, 11) + "...";
  }
  previousDisplay.textContent = "";
  operator = "";
  currentValue = "";
}

function keyPress(e) {
  e.preventDefault();
  if (e.key >= 0 && e.key <= 11) {
    getNumber(e.key);
  }
  if (
    e.key === "Enter" ||
    (e.key === "=" && currentNum != "" && previousNum != "")
  ) {
    compute();
  }
  if (e.key === "+" || e.key === "-" || e.key === "/") {
    getOperator(e.key);
  }
  if (e.key === "*") {
    getOperator("x");
  }
  if (e.key === ".") {
    addDecimal();
  }
  if (e.key === "Backspace") {
    backSpace("arrow");
  }
}

function backSpace() {
  if (currentValue != "") {
    currentValue = currentValue.slice(0, -1);
    currentDisplay.textContent = currentValue;
    if (currentValue === "") {
      currentDisplay.textContent = "0";
    }
  }
  if (currentValue === "" && previousValue !== "" && operator === "") {
    previousValue = previousValue.slice(0, -1);
    currentDisplay.textContent = previousValue;
  }
}
