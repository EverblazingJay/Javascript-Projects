const keys = document.querySelectorAll(".key");
const display_input = document.querySelector(".display .input");
const display_output = document.querySelector(".display .output");
let input = "";

for (let key of keys) {
  let value = key.dataset.key;

  key.addEventListener("click", () => {
    if (value == "clear") {
      input = "";
      display_input.textContent = "";
      display_output.textContent = "";
    } else if (value == "backspace") {
      input = input.slice(0, -1);
      display_input.textContent = cleanInput(input);
    } else if (value == "=") {
      let result = eval(prepareInput(input));
      display_output.textContent = cleanOutput(result);
    } else if (value == "brackets") {
      if (
        input.indexOf("(") == -1 ||
        (input.indexOf(")") != -1 &&
          input.indexOf("(") != -1 &&
          input.lastIndexOf("(") < input.lastIndexOf(")"))
      ) {
        input += "(";
      } else if (
        (input.indexOf("(") != -1 && input.indexOf(")") == -1) ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") > input.lastIndexOf(")"))
      ) {
        input += ")";
      }
      display_input.textContent = cleanInput(input);
    } else {
      if (validateInput(value)) {
        input += value;
        display_input.textContent = cleanInput(input);
      }
    }
  });
}

// Clean Input
const cleanInput = function (input) {
  let inputArray = input.split("");
  let inputArrayLength = inputArray.length;

  for (let i = 0; i < inputArrayLength; i++) {
    //   if (inputArray[i] == "*") {
    //     inputArray[i];
    //   } else if (inputArray[i] == "/") {
    //     inputArray[i] = `<span class= 'operator'>/</span>`;
    //   } else if (inputArray[i] == "-") {
    //     inputArray[i] = `<span class = 'operator'>-</span>`;
    //   } else if (inputArray[i] == "+") {
    //     inputArray[i] = `<span class = 'operator'>+</span>`;
    //   } else if (inputArray[i] == "(") {
    //     inputArray[i] = `<span class = 'brackets'>(</span>`;
    //   } else if (inputArray[i] == ")") {
    //     inputArray[i] = `<span class = 'brackets'>)</span>`;
    //   } else if (inputArray[i] == "%") {
    //     inputArray[i] = `<span class = 'percent'>%</span>`;
    //   }
    // }
    inputArray[i];
    return inputArray.join("");
  }
};

//Clean Output

const cleanOutput = function (output) {
  let outputString = output.toString();
  let decimal = outputString.split(".")[1];
  outputString = outputString.split(".")[0];

  let outputArray = outputString.split("");

  if (outputArray.length > 3) {
    for (i = outputArray.length - 3; i > 0; i -= 3) {
      outputArray.splice(i, 0, ",");
    }
  }
  if (decimal) {
    outputArray.push(".");
    outputArray.push(decimal);
  }
  return outputArray.join("");
};

const validateInput = function (value) {
  let lastInput = input.slice(-1);
  let operators = ["+", "-", "*", "/"];
  if (value === "." && lastInput === ".") {
    return false;
  }
  if (operators.includes(value)) {
    if (operators.includes(lastInput)) {
      return false;
    } else {
      return true;
    }
  }
  return true;
};

const prepareInput = function (input) {
  let inputArray = input.split("");
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i] === "%") {
      inputArray[i] = "/100";
    }
  }
  return inputArray.join("");
};
