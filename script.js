var container = document.getElementById("container");
var container2 = document.getElementById("main-grid");
var container3 = document.getElementById("right-grid");
var screen = document.getElementById("input-tab");
var screen2 = document.getElementById("other-tab");
const charList = "+-*/^=.0123456789e";
const ops = "+-*/^";
var result = "";

function createMainGrid() {
  var firstRow = [
    "AC",
    "C",
    "xʸ",
    "÷",
    7,
    8,
    9,
    "x",
    4,
    5,
    6,
    "-",
    1,
    2,
    3,
    "+",
    0,
    ".",
    "+/-",
    "="
  ];
  firstRow.forEach(element => {
    if (element === "AC" || element === "xʸ" || element === "C") {
      let newDiv = document.createElement("button");
      newDiv.className = "clear-item";
      newDiv.id = element;
      newDiv.innerHTML = element;
      container2.appendChild(newDiv);
    } else if (
      element === "÷" ||
      element === "x" ||
      element === "+" ||
      element === "-" ||
      element === "="
    ) {
      let newDiv = document.createElement("button");
      newDiv.className = "op-item";
      newDiv.id = element;
      newDiv.innerHTML = element;
      container2.appendChild(newDiv);
    } else {
      let newDiv = document.createElement("button");
      newDiv.className = "num-item";
      newDiv.id = element;
      newDiv.innerHTML = element;
      container2.appendChild(newDiv);
    }
  });
}

function generateMouse() {
  const buttons = document.querySelectorAll(".num-item, .clear-item, .op-item");
  screen.innerHTML = "0";
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      if (result.charAt(0) === "0") result = result.substring(1);
      if (button.id === "AC") {
        //all clear
        screen.innerHTML = "0";
        screen2.innerHTML = "";
        result = "";
      } else if (button.id === "+/-") {
        //positive/negative
        if (screen.innerHTML !== "0") {
          if (screen.innerHTML < 0) {
            result = result.substring(
              0,
              result.length - screen.innerHTML.length - 2
            );
            screen.innerHTML *= -1;
            result += " " + screen.innerHTML;
          } else {
            result = result.substring(
              0,
              result.length - screen.innerHTML.length
            );
            screen.innerHTML *= -1;
            result += " (" + screen.innerHTML + ")";
          }
        }
      } else if (button.id === "C") {
        //backspace
        if (
          screen.innerHTML === "Infinity" ||
          (screen.innerHTML == "" && screen2.innerHTML.indexOf("=") == -1)
        ) {
          screen.innerHTML = "0";
          result = screen2.innerHTML;
        } else if (screen.innerHTML != "0") {
          screen.innerHTML = screen.innerHTML.substring(
            0,
            screen.innerHTML.length - 1
          );
          result = result.substring(0, result.length - 1);
          if (screen.innerHTML == "") {
            screen.innerHTML = "0";
            if (screen2.innerHTML.indexOf("=") != -1) {
              result = "";
              screen2.innerHTML = "";
            }
          }
        }
      } else if (button.id === "=") {
        //equal
        if (screen.innerHTML === "0") result += 0;
        screen2.innerHTML += screen.innerHTML + " = ";
        var temp = "" + eval(result);
        if (temp.length >= 10) {
          temp = temp.substring(0, 10);
        }
        screen.innerHTML = temp;
        result = temp;
      } else {
        //any other key
        if (screen.innerHTML === "0" || screen.innerHTML === "Infinity")
          screen.innerHTML = "";

        if (!(button.id >= 0 && button.id <= 9) && button.id != ".") {
          if (screen.innerHTML != "") {
            if (screen2.innerHTML.indexOf("=") != -1) {
              screen2.innerHTML = "";
            }
            if (button.id === "÷") result += "/";
            else if (button.id === "x") result += "*";
            else if (button.id === "xʸ") result += "**";
            else result += button.id;
            if (button.id === "xʸ")
              screen2.innerHTML += screen.innerHTML + " " + "^" + " ";
            else screen2.innerHTML += screen.innerHTML + " " + button.id + " ";
            screen.innerHTML = "0";
          } else screen.innerHTML = "0";
        } else if (screen.innerHTML.length < 10) {
          result += button.id;
          screen.innerHTML += button.id;
        }
      }
    });
  });
}

function generateKeys() {
  screen.innerHTML = "0";
  document.addEventListener("keydown", e => {
    if (result.charAt(0) === "0") result = result.substring(1);
    if (e.key === "a") {
      //all clear
      screen.innerHTML = "0";
      result = "";
      screen2.innerHTML = "";
    } else if (e.key === "Backspace" || e.key == "c") {
      //backspace
      if (
        screen.innerHTML === "Infinity" ||
        (screen.innerHTML == "" && screen2.innerHTML.indexOf("=") == -1)
      ) {
        screen.innerHTML = "0";
        result = screen2.innerHTML;
      } else if (screen.innerHTML != "0") {
        screen.innerHTML = screen.innerHTML.substring(
          0,
          screen.innerHTML.length - 1
        );
        result = result.substring(0, result.length - 1);
        if (screen.innerHTML == "") {
          screen.innerHTML = "0";
          if (screen2.innerHTML.indexOf("=") != -1) {
            result = "";
            screen2.innerHTML = "";
          }
        }
      }
    } else if (e.key === "=" || e.key === "Enter") {
      //equal
      if (screen.innerHTML === "0") result += 0;
      screen2.innerHTML += screen.innerHTML + " = ";
      var temp = eval(result);
      if (temp > 9999999999 || temp < -9999999999) {
        temp = temp.toExponential(4);
      }
      screen.innerHTML = "" + temp;
      result = "" + temp;
    } else if (charList.indexOf(e.key) != -1) {
      //any other key
      if (screen.innerHTML === "0" || screen.innerHTML === "Infinity")
        screen.innerHTML = "";

      if (ops.indexOf(e.key) !== -1) {
        if (screen.innerHTML != "") {
          if (e.key != "^") result += e.key;
          else result += "**";
          if (screen2.innerHTML.indexOf("=") != -1) {
            screen2.innerHTML = "";
          }
          if (e.key === "*") screen2.innerHTML += screen.innerHTML + " x ";
          else if (e.key === "/") screen2.innerHTML += screen.innerHTML + " ÷ ";
          else screen2.innerHTML += screen.innerHTML + " " + e.key + " ";
          screen.innerHTML = "0";
        } else screen.innerHTML = "0";
      } else if (screen.innerHTML.length < 10) {
        result += e.key;
        screen.innerHTML += e.key;
      }
    }
  });
}
//fix second input overflow, colored background, add button highlights for keyboard
createMainGrid();
generateMouse();
generateKeys();