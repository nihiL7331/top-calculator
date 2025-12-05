const displayValue = document.querySelector(".value");
const buttonContainer = document.querySelector(".buttons");

let inputType = 0; // 0 - normal, 1 - accumulator
let accumulator = "";
let currentSign = "";
let currentValue = "";

function removeError() {
  if (displayValue.textcontent === "ERROR")
    inputType == 0 ? (currentValue = "") : (accumulator = "");
  updateDisplay();
}

function removeValue() {
  let checkedValue = inputType == 0 ? currentValue : accumulator;

  checkedValue = checkedValue.slice(0, -1);
  const lastChar = checkedValue.charAt(checkedValue.length - 1);
  if (lastChar === "." || lastChar === "-")
    checkedValue = checkedValue.slice(0, -1);
  inputType == 0 ? (currentValue = checkedValue) : (accumulator = checkedValue);
  updateDisplay();
}

function negateValue() {
  let checkedValue = inputType == 0 ? currentValue : accumulator;

  if (checkedValue === "") return;
  if (checkedValue.charAt(0) == "-") checkedValue = checkedValue.slice(1);
  else checkedValue = "-" + checkedValue;
  inputType == 0 ? (currentValue = checkedValue) : (accumulator = checkedValue);
  updateDisplay();
}

function percentValue() {
  // if acc type, then do val sign val*acc/100
  // if input type, then do val/100
  if (currentSign === "") {
    currentValue = `${+currentValue / 100}`;
    updateDisplay();
  } else {
    accumulator = `${+accumulator / 100}`;
    updateValue();
  }
}

function clearValues() {
  inputType = 0;
  accumulator = "";
  currentSign = "";
  currentValue = "";
  updateDisplay();
}

function updateValue() {
  if (currentSign === "") return;

  if (currentSign === "plus") currentValue = `${+currentValue + +accumulator}`;
  else if (currentSign === "minus")
    currentValue = `${+currentValue - +accumulator}`;
  else if (currentSign === "divide")
    currentValue = `${+currentValue / +accumulator}`;
  else if (currentSign === "mult")
    currentValue = `${+currentValue * +accumulator}`;

  currentSign = "";
  accumulator = "";
  inputType = 0;
  updateDisplay();
}

function appendValue(id) {
  let checkedValue = inputType == 0 ? currentValue : accumulator;

  if (checkedValue.includes(".") && checkedValue.length > 10) return;
  else if (!checkedValue.includes(".") && checkedValue.length > 9) return;

  // if (id == "." && checkedValue.contains(".")) return;
  checkedValue += id;
  inputType == 0 ? (currentValue = checkedValue) : (accumulator = checkedValue);
  updateDisplay();
}

function updateSign(sign) {
  currentSign = sign;
  inputType = 1;
}

function updateDisplay() {
  //later add cutting of decimals
  const checkedValue = inputType == 0 ? currentValue : accumulator;

  if (!Number.isFinite(+checkedValue)) {
    displayValue.textContent = "ERROR";
    return;
  }

  if (checkedValue.includes("."))
    displayValue.textContent = checkedValue.slice(0, 11);
  else displayValue.textContent = checkedValue.slice(0, 10);
}

function onButtonClicked(e) {
  const id = e.target.id;

  removeError();

  switch (id) {
    case "remove":
      removeValue();
      break;
    case "negate":
      negateValue();
      break;
    case "percent":
      percentValue();
      break;
    case "clear":
      clearValues();
      break;
    case "comma":
      appendValue(".");
      break;
    case "equals":
      updateValue();
      break;
    default:
      if (
        id.startsWith("num") &&
        id.length === 4 &&
        Number.isInteger(+id.charAt(3))
      ) {
        appendValue(id.charAt(3));
      } else updateSign(id);
  }

  console.log(newVal);
}

function onKeyPressed(e) {
  const key = e.key;
  console.log(key);
  if (key.length === 1 && Number.isInteger(+key)) {
    appendValue(+key);
    return;
  }
  switch (key) {
    case "Backspace":
      removeValue();
      break;
    case "%":
      percentValue();
      break;
    case "c":
      clearValues();
      break;
    case ".":
      appendValue(".");
      break;
    case ",":
      appendValue(".");
      break;
    case "=":
      updateValue();
      break;
    case "+":
      updateSign("plus");
      break;
    case "-":
      updateSign("minus");
      break;
    case "*":
      updateSign("mult");
      break;
    case "/":
      updateSign("divide");
      break;
  }
}

buttonContainer.addEventListener("click", onButtonClicked);
document.addEventListener("keydown", onKeyPressed);
